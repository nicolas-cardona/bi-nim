import { Module } from '@nestjs/common';
import { MatchModule } from './match/match.module';
import { TurnModule } from './turn/turn.module';

@Module({
  imports: [MatchModule, TurnModule],
})
export class AppModule {}
