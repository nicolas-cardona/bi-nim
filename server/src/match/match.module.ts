import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { MatchModel } from './match.model';

@Module({
  controllers: [MatchController],
  providers: [MatchService, MatchModel],
  exports: [MatchService],
})
export class MatchModule {}