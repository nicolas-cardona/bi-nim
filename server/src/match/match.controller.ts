import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MatchService } from './match.service';
import { Match } from './entities/match.entity';
import { MatchOptionsDto } from './dto/match-options.dto';
import { UUID } from 'crypto';

@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post('new')
  async newMatch(@Body() matchOptionsDto: MatchOptionsDto): Promise<Match> {
    const match = this.matchService.createMatch(matchOptionsDto, 20);
    return await this.matchService.add(match);
  }

  @Get(':matchId')
  async getOne(@Param('matchId') matchId: UUID): Promise<Match> {
    return await this.matchService.findOne({
      match_id: matchId,
    });
  }
}
