import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TurnService } from './turn.service';
import { Turn } from './entities/turn.entity';
import { UUID } from 'crypto';
import { TurnPlayed } from './dto/turn-played.dto';

@Controller('turn')
export class TurnController {
  constructor(private readonly turnService: TurnService) {}

  @Post('new')
  async newMatch(@Body() turnPlayed: TurnPlayed): Promise<Turn> {
    const turn = await this.turnService.createTurn(turnPlayed);
    return await this.turnService.add(turn);
  }

  @Get(':matchId')
  async getOne(@Param('matchId') matchId: UUID): Promise<Turn[]> {
    return await this.turnService.find({
      match_id: matchId,
    });
  }
}
