import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MatchService } from './match.service';
import { Match } from './entities/match.entity';
import { MatchOptionsDto } from './dto/match-options.dto';
import { UUID } from 'crypto';

const supremum = 20;

@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post('new')
  async newMatch(@Body() matchOptionsDto: MatchOptionsDto): Promise<Match> {
    return await this.matchService.add(matchOptionsDto, supremum);
  }

  @Get(':matchId')
  async getOne(@Param('matchId') matchId: UUID): Promise<Match> {
    return await this.matchService.findOne({
      match_id: matchId,
    });
  }
}
