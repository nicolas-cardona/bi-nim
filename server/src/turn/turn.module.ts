import { Module, forwardRef } from '@nestjs/common';
import { TurnService } from './turn.service';
import { TurnController } from './turn.controller';
import { TurnModel } from './turn.model';
import { MatchModule } from '../match/match.module';
import { StrategyModule } from '../strategy/strategy.module';

@Module({
  imports: [forwardRef(() => MatchModule), StrategyModule],
  controllers: [TurnController],
  providers: [TurnService, TurnModel],
  exports: [TurnService],
})
export class TurnModule {}
