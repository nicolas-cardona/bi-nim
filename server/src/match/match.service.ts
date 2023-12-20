import { Injectable } from '@nestjs/common';
import { MatchModel } from './match.model';
import { Match } from './entities/match.entity';
import { MatchOptionsDto } from './dto/match-options.dto';
import { Player } from './enums/player.enums';

@Injectable()
export class MatchService {
  constructor(private readonly matchModel: MatchModel) {}

  public async findOne(match: Partial<Match>): Promise<Match> {
    return await this.matchModel.findOne(match);
  }

  public async add(match: Partial<Match>): Promise<Match> {
    return await this.matchModel.add(match);
  }

  private getRandomInt(supremum: number) {
    return Math.floor(Math.random() * supremum);
  }

  private randomPlayer(): Player {
    const randomInt = this.getRandomInt(2);
    if (randomInt === 0) {
      return Player.COMPUTER;
    } else {
      return Player.USER;
    }
  }

  public createMatch(
    matchOptionsDto: MatchOptionsDto,
    supremum: number,
  ): Partial<Match> {
    const match = {};
    const { piles, firstPlayer } = matchOptionsDto;
    if (firstPlayer === 'RANDOM') {
      match['first_player'] = this.randomPlayer();
    }
    for (let i = 0; i < piles; i++) {
      match[`integer_${i + 1}`] = this.getRandomInt(supremum);
    }
    return match;
  }
}
