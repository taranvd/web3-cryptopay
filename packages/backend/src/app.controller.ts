import { Controller, Get, Query } from '@nestjs/common';
import { ContractService } from './contract/contract.service';

@Controller()
export class AppController {
  constructor(private readonly contractService: ContractService) {}

  @Get('/getNameAndBalance')
  async getNameAndBalance(@Query() query: { userAddress: string }) {
    const { userAddress } = query;

    const name = await this.contractService.getName(userAddress);
    const balance = await this.contractService.getBalance(userAddress);
    const history = await this.contractService.getHistory(userAddress);
    const requests = await this.contractService.getRequests(userAddress);
    const dollars = await this.contractService.getBalanceInUSD(userAddress);

    const response = {
      name,
      balance,
      dollars,
      history,
      requests,
    };

    return response;
  }

  @Get('/getTokenPrice')
  async getTokenPrice(@Query() query: { tokenAddress: string }) {
    const { tokenAddress } = query;
    const price = await this.contractService.getTokenPrice(tokenAddress);
    return { price };
  }
}
