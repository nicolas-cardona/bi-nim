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
import { StrategyService } from '../strategy/strategy.service';
import { Turn } from '../turn/entities/turn.entity';

@Injectable()
export class MatchService {
  constructor(
    private readonly matchModel: MatchModel,
    @Inject(forwardRef(() => TurnService))
    private readonly turnService: TurnService,
    private readonly strategyService: StrategyService,
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
      setupTurn[`integer_${i + 1}`] = this.strategyService.getRandomInt(
        1,
        maxPile,
      );
    }

    if (firstPlayer === 'RANDOM') {
      setupTurn['next_player'] = this.randomPlayer();
    } else {
      setupTurn['next_player'] = matchOptionsDto.firstPlayer;
    }
    return await this.matchModel.addWithTurnTransaction(setupMatch, setupTurn);
  }

  private randomPlayer(): Player {
    const randomInt = this.strategyService.getRandomInt(0, 2);
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
    if (matchFounded.match_finished !== null) {
      throw new BadRequestException('this game has finished');
    } else {
      return true;
    }
  }

  public async endGame(lastTurnPosted: Turn): Promise<Match> {
    const winner = lastTurnPosted.next_player;
    return await this.matchModel.update(
      {
        match_id: lastTurnPosted.match_id,
      },
      {
        winner: winner,
      },
    );
  }
}
