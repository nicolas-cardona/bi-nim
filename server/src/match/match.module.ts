import { Module, forwardRef } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { MatchModel } from './match.model';
import { TurnModule } from 'src/turn/turn.module';

@Module({
  imports: [forwardRef(() => TurnModule)],
  controllers: [MatchController],
  providers: [MatchService, MatchModel],
  exports: [MatchService],
})
export class MatchModule {}
