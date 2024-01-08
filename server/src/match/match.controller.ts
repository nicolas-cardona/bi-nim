import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MatchService } from './match.service';
import { Match } from './entities/match.entity';
import { MatchOptionsDto } from './dto/match-options.dto';
import { UUID } from 'crypto';

@Controller('matches')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post('/')
  async newMatch(@Body() matchOptionsDto: MatchOptionsDto): Promise<Match> {
    return await this.matchService.add(matchOptionsDto);
  }

  @Get(':matchId')
  async getOne(@Param('matchId') matchId: UUID): Promise<Match> {
    return await this.matchService.findOne({
      match_id: matchId,
    });
  }
}
