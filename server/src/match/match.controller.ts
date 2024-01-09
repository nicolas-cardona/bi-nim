import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { MatchService } from './match.service';
import { Match } from './entities/match.entity';
import { MatchOptionsDto } from './dto/match-options.dto';
import { UUID } from 'crypto';
import { Turn } from 'src/turn/entities/turn.entity';

@Controller('matches')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post('/')
  async newMatch(
    @Body() matchOptionsDto: MatchOptionsDto,
  ): Promise<[Match, Turn]> {
    return await this.matchService.addWithTurnTransaction(matchOptionsDto);
  }

  @Get(':matchId')
  async getOne(@Param('matchId', ParseUUIDPipe) matchId: UUID): Promise<Match> {
    return await this.matchService.findOne({
      match_id: matchId,
    });
  }
}
