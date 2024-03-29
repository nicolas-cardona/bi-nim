import { Module, forwardRef } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { MatchModel } from './match.model';
import { TurnModule } from '../turn/turn.module';
import { StrategyModule } from '../strategy/strategy.module';

@Module({
  imports: [forwardRef(() => TurnModule), StrategyModule],
  controllers: [MatchController],
  providers: [MatchService, MatchModel],
  exports: [MatchService],
})
export class MatchModule {}
