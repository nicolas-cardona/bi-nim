import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { MatchModel } from './match.model';
import { Match } from './entities/match.entity';
import { MatchOptionsDto } from './dto/match-options.dto';
import { Player } from './enums/player.enums';
import { TurnService } from '../turn/turn.service';
import { MatchAndTurnDto } from './dto/match-and-turn.dto';

@Injectable()
export class MatchService {
  constructor(
    private readonly matchModel: MatchModel,
    @Inject(forwardRef(() => TurnService))
    private readonly turnService: TurnService,
  ) {}

  public async find(match: Partial<Match>): Promise<Match[]> {
    return await this.matchModel.find(match);
  }

  public async findOne(match: Partial<Match>): Promise<Match> {
    return await this.matchModel.findOne(match);
  }

  public async addWithTurnTransaction(
    matchOptionsDto: MatchOptionsDto,
  ): Promise<MatchAndTurnDto> {
    const setupMatch = {};
    const setupTurn = {};
    const { firstPlayer, piles } = matchOptionsDto;
    const maxPile = 20;

    for (let i = 0; i < piles; i++) {
      setupTurn[`integer_${i + 1}`] = this.getRandomInt(1, maxPile);
    }

    if (firstPlayer === 'RANDOM') {
      setupMatch['first_player'] = this.randomPlayer();
    } else {
      setupMatch['first_player'] = matchOptionsDto.firstPlayer;
    }
    return await this.matchModel.addWithTurnTransaction(setupMatch, setupTurn);
  }

  public getRandomInt(minimum: number, supremum: number) {
    if (minimum <= supremum) {
      return Math.floor(Math.random() * (supremum - minimum) + minimum);
    } else {
      throw new Error('supremumm must be greater or equal than minimum');
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

  public async matchUnfinishedVerification(
    match: Partial<Match>,
  ): Promise<boolean> {
    const matchFounded = await this.findOne({
      match_id: match.match_id,
    });
    if (matchFounded.match_finished) {
      throw new BadRequestException('this game has finished');
    } else {
      return true;
    }
  }

  public async endGame(match: Partial<Match>): Promise<Match> {
    const lastTurnPosted = await this.turnService.findLastOne({
      match_id: match.match_id,
    });
    const winner = await this.turnService.nextPlayer(lastTurnPosted);
    return await this.matchModel.update(
      {
        match_id: match.match_id,
      },
      {
        winner: winner,
      },
    );
  }
}
