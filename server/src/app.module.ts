import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MatchModule } from './match/match.module';
import { TurnModule } from './turn/turn.module';
import { StrategyModule } from './strategy/strategy.module';

@Module({
  imports: [MatchModule, TurnModule, StrategyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
