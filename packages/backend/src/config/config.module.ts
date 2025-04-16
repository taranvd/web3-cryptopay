import { Module } from '@nestjs/common';
import { ConfigModule as WrapConfigModule } from '@nestjs/config';
import { MyConfigService } from './config.service';

@Module({
  imports: [
    WrapConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [MyConfigService],
  exports: [MyConfigService],
})
export class ConfigModule {}
