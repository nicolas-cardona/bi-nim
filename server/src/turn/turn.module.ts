import { Module } from '@nestjs/common';
import { TurnService } from './turn.service';
import { TurnController } from './turn.controller';
import { TurnModel } from './turn.model';
import { StrategyModule } from 'src/strategy/strategy.module';

@Module({
  imports: [StrategyModule],
  controllers: [TurnController],
  providers: [TurnService, TurnModel],
  exports: [TurnService],
})
export class TurnModule {}
