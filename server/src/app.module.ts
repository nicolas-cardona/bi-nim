import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MatchModule } from './match/match.module';
import { TurnModule } from './turn/turn.module';

@Module({
  imports: [MatchModule, TurnModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
