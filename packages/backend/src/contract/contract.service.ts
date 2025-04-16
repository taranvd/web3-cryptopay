import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { MyConfigService } from '../config/config.service';
import CONTRACT_ABI from './abi';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ContractService {
  private provider: ethers.JsonRpcProvider;
  private contract: ethers.Contract;

  constructor(
    private configService: MyConfigService,
    private httpService: HttpService,
  ) {
    this.provider = new ethers.JsonRpcProvider(this.configService.rpcUrl);

    const contractAddress = this.configService.contractAddress;

    this.contract = new ethers.Contract(
      contractAddress,
      CONTRACT_ABI,
      this.provider,
    );
  }

  async getName(userAddress: string): Promise<string> {
    return await this.contract.getMyName(userAddress);
  }

  async getTokenPrice(tokenAddress: string): Promise<string> {
    try {
      const response = await this.httpService
        .get(`https://min-api.cryptocompare.com/data/price`, {
          params: {
            fsym: 'ETH',
            tsyms: 'USD',
          },
        })
        .toPromise();

      if (!response) {
        throw new Error('No response from API');
      }

      const price = response.data?.USD;

      if (!price) {
        throw new Error('Price not found');
      }
      return price.toString();
    } catch (error) {
      console.error('Error fetching token price: ', error);
      return '0';
    }
  }

  async getBalanceInUSD(
    userAddress: string,
    tokenAddress: string = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  ): Promise<string> {
    try {
      const balance = await this.provider.getBalance(userAddress);
      const balanceInEther = ethers.formatEther(balance);

      const tokenPrice = await this.getTokenPrice(tokenAddress);

      if (tokenPrice === '0') {
        return '0';
      }

      const balanceInUSD = parseFloat(balanceInEther) * parseFloat(tokenPrice);

      return balanceInUSD.toFixed(2);
    } catch (error) {
      console.error('Error calculating balance in USD: ', error);
      return '0';
    }
  }

  async getBalance(userAddress: string): Promise<string> {
    const balance = await this.provider.getBalance(userAddress);
    return ethers.formatEther(balance);
  }

  async getHistory(userAddress: string): Promise<any[]> {
    const history = await this.contract.getMyHistory(userAddress);
    return history
      .map((transaction, index) => ({
        key: (history.length + 1 - index).toString(),
        type: transaction[0],
        amount: transaction[1].toString(),
        message: transaction[2],
        address: `${transaction[3].slice(0, 4)}...${transaction[3].slice(-4)}`,
        subject: transaction[4],
      }))
      .reverse();
  }
  async getRequests(userAddress: string): Promise<any[]> {
    const [addresses, amounts, messages, subjects] =
      await this.contract.getMyRequests(userAddress);

    return addresses.map((address, index) => ({
      address,
      amount: amounts[index].toString(),
      message: messages[index],
      subject: subjects[index],
    }));
  }
}
