import { Injectable } from '@nestjs/common';
import { MatchService } from 'src/match/match.service';
import { Statistic } from './entities/statistic.entity';
import { Player } from 'src/match/enums/player.enums';

@Injectable()
export class StatisticsService {
  constructor(private readonly matchService: MatchService) {}

  public async get(): Promise<Statistic> {
    const statistics = new Statistic();
    const matchesFinished = await this.matchService.find({
      match_finished: true,
    });
    const matchesWon = await this.matchService.find({
      winner: Player.USER,
    });
    statistics.totalMatches = matchesFinished.length;
    statistics.winningMatches = matchesWon.length;
    return statistics;
  }
}
