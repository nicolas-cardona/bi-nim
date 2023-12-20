import { Module } from '@nestjs/common';
import { TurnService } from './turn.service';
import { TurnController } from './turn.controller';
import { TurnModel } from './turn.model';

@Module({
  controllers: [TurnController],
  providers: [TurnService, TurnModel],
  exports: [TurnService],
})
export class TurnModule {}
