import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TurnService } from './turn.service';
import { Turn } from './entities/turn.entity';
import { UUID } from 'crypto';
import { TurnPlayed } from './dto/turn-played.dto';
import { MatchService } from '../match/match.service';

@Controller('turns')
export class TurnController {
  constructor(
    private readonly turnService: TurnService,
    private readonly matchService: MatchService,
  ) {}

  @Post(':matchId/user')
  async newUserMatch(
    @Param('matchId', ParseUUIDPipe) matchId: UUID,
    @Body() turnPlayed: TurnPlayed,
  ): Promise<Turn> {
    await this.matchService.matchUnfinishedVerification({
      match_id: matchId,
    });
    const lastTurnPosted = await this.turnService.findLastOne({
      match_id: matchId,
    });
    const turn = await this.turnService.createTurn(turnPlayed, lastTurnPosted);
    return await this.turnService.add(turn);
  }

  @Get(':matchId')
  async getOne(
    @Param('matchId', ParseUUIDPipe) matchId: UUID,
  ): Promise<Turn[]> {
    return await this.turnService.find({
      match_id: matchId,
    });
  }
}
