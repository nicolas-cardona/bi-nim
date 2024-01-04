import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MatchModule } from './match/match.module';
import { TurnModule } from './turn/turn.module';
import { StrategyModule } from './strategy/strategy.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [MatchModule, TurnModule, StrategyModule, StatisticsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
