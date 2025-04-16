import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContractService } from './contract/contract.service';
import { ConfigModule } from './config/config.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [AppController],
  providers: [AppService, ContractService],
})
export class AppModule {}
