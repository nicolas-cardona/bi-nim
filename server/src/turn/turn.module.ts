import { Module, forwardRef } from '@nestjs/common';
import { TurnService } from './turn.service';
import { TurnController } from './turn.controller';
import { TurnModel } from './turn.model';
import { StrategyModule } from 'src/strategy/strategy.module';
import { MatchModule } from 'src/match/match.module';

@Module({
  imports: [StrategyModule, forwardRef(() => MatchModule)],
  controllers: [TurnController],
  providers: [TurnService, TurnModel],
  exports: [TurnService],
})
export class TurnModule {}
