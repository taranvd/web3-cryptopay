import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MyConfigService {
  constructor(private configService: ConfigService) {}

  get rpcUrl(): string {
    const value = this.configService.get<string>('RPC_URL');
    if (!value) {
      throw new Error('RPC_URL is not defined in .env file');
    }
    return value;
  }

  get contractAddress(): string {
    const value = this.configService.get<string>('CONTRACT_ADDRESS');
    if (!value) {
      throw new Error('CONTRACT_ADDRESS is not defined in .env file');
    }
    return value;
  }

  get chainId(): number {
    const value = this.configService.get<number>('CHAIN_ID');
    if (value === undefined) {
      throw new Error('CHAIN_ID is not defined in .env file');
    }
    return value;
  }
}
