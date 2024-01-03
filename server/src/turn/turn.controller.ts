import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TurnService } from './turn.service';
import { Turn } from './entities/turn.entity';
import { UUID } from 'crypto';
import { TurnPlayed } from './dto/turn-played.dto';
import { StrategySelected } from './dto/strategy-selected.dto';
import { MatchService } from 'src/match/match.service';
import { Player } from 'src/match/enums/player.enums';

@Controller('turn')
export class TurnController {
  constructor(
    private readonly turnService: TurnService,
    private readonly matchService: MatchService,
  ) {}

  // TODO verify if USER is the correct next player
  @Post(':matchId/user')
  async newUserMatch(
    @Param('matchId') matchId: UUID,
    @Body() turnPlayed: TurnPlayed,
  ): Promise<Turn> {
    await this.matchService.matchUnfinishedVerification({
      match_id: matchId,
    });
    const lastTurnPosted = await this.turnService.findLastOne({
      match_id: matchId,
    });
    const nextPlayer = await this.turnService.nextPlayer(lastTurnPosted);
    this.turnService.nextPlayerVerification(Player.USER, nextPlayer);
    const turn = await this.turnService.createTurn(turnPlayed, lastTurnPosted);
    return await this.turnService.add(turn);
  }

  // TODO verify if COMPUTER is the correct next player
  @Post(':matchId/computer')
  async newComputerMatch(
    @Param('matchId') matchId: UUID,
    @Body() strategySelected: StrategySelected,
  ): Promise<Turn> {
    await this.matchService.matchUnfinishedVerification({
      match_id: matchId,
    });
    const lastTurnPosted = await this.turnService.findLastOne({
      match_id: matchId,
    });
    const nextPlayer = await this.turnService.nextPlayer(lastTurnPosted);
    this.turnService.nextPlayerVerification(Player.COMPUTER, nextPlayer);
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
