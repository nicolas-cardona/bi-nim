import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TurnService } from './turn.service';
import { Turn } from './entities/turn.entity';
import { UUID } from 'crypto';
import { TurnPlayed } from './dto/turn-played.dto';
import { StrategySelected } from './dto/strategy-selected.dto';

@Controller('turn')
export class TurnController {
  constructor(private readonly turnService: TurnService) {}

  @Post(':matchId/user')
  async newUserMatch(
    @Param('matchId') matchId: UUID,
    @Body() turnPlayed: TurnPlayed,
  ): Promise<Turn> {
    const lastTurnPosted = await this.turnService.findLastOne({
      match_id: matchId,
    });
    const turn = await this.turnService.createTurn(turnPlayed, lastTurnPosted);
    return await this.turnService.add(turn);
  }

  @Post(':matchId/computer')
  async newComputerMatch(
    @Param('matchId') matchId: UUID,
    @Body() strategySelected: StrategySelected,
  ): Promise<Turn> {
    const lastTurnPosted = await this.turnService.findLastOne({
      match_id: matchId,
    });
    const turnPlayed = await this.turnService.createComputerTurnPlayed(
      lastTurnPosted,
      strategySelected,
    );
    const turn = await this.turnService.createTurn(turnPlayed, lastTurnPosted);
    return await this.turnService.add(turn);
  }

  @Get(':matchId')
  async getOne(@Param('matchId') matchId: UUID): Promise<Turn[]> {
    return await this.turnService.find({
      match_id: matchId,
    });
  }
}
