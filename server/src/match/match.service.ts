import { Injectable } from '@nestjs/common';
import { MatchModel } from './match.model';
import { Match } from './entities/match.entity';
import { MatchOptionsDto } from './dto/match-options.dto';
import { Player } from './enums/player.enums';
import { Turn } from 'src/turn/entities/turn.entity';
import { TurnService } from 'src/turn/turn.service';

@Injectable()
export class MatchService {
  constructor(
    private readonly matchModel: MatchModel,
    private readonly turnService: TurnService,
  ) {}

  public async findOne(match: Partial<Match>): Promise<Match> {
    return await this.matchModel.findOne(match);
  }

  public async add(
    matchOptionsDto: MatchOptionsDto,
    supremum: number,
  ): Promise<Match> {
    const setupMatch = {};
    const { firstPlayer } = matchOptionsDto;
    if (firstPlayer === 'RANDOM') {
      setupMatch['first_player'] = this.randomPlayer();
    } else {
      setupMatch['first_player'] = matchOptionsDto.firstPlayer;
    }
    const match = await this.matchModel.add(setupMatch);
    await this.setupInitialTurn(match, matchOptionsDto, supremum);
    return await this.matchModel.findOne(match);
  }

  // Function that generates random integers in the interval [minimum, supremum)
  private getRandomInt(minimum: number, supremum: number) {
    if (minimum < supremum) {
      return Math.floor(Math.random() * (supremum - minimum) + minimum);
    } else {
      throw new Error('supremumm must be greater than minimum');
    }
  }

  private randomPlayer(): Player {
    const randomInt = this.getRandomInt(0, 2);
    if (randomInt === 0) {
      return Player.COMPUTER;
    } else {
      return Player.USER;
    }
  }

  private async setupInitialTurn(
    match: Partial<Match>,
    matchOptionsDto: MatchOptionsDto,
    supremum: number,
  ): Promise<Turn> {
    const turn = {
      match_id: match.match_id,
    };
    const { piles } = matchOptionsDto;
    for (let i = 0; i < piles; i++) {
      turn[`integer_${i + 1}`] = this.getRandomInt(1, supremum);
    }
    return await this.turnService.add(turn);
  }
}
