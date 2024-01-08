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
import { TurnService } from 'src/turn/turn.service';

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

  public async add(matchOptionsDto: MatchOptionsDto): Promise<Match> {
    const setupMatch = {};
    const { firstPlayer } = matchOptionsDto;
    if (firstPlayer === 'RANDOM') {
      setupMatch['first_player'] = this.randomPlayer();
    } else {
      setupMatch['first_player'] = matchOptionsDto.firstPlayer;
    }
    const match = await this.matchModel.add(setupMatch);
    const maxPile = 20;
    await this.turnService.setupInitialTurn(match, matchOptionsDto, maxPile);
    return await this.matchModel.findOne(match);
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
    if (matchFounded.match_finished === true) {
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
