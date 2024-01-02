import { Module } from '@nestjs/common';
import { StrategyService } from './strategy.service';

@Module({
  providers: [StrategyService],
})
export class StrategyModule {}
