import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { TurnModel } from './turn.model';
import { Turn } from './entities/turn.entity';
import { TurnPlayed } from './dto/turn-played.dto';
import { MatchService } from '../match/match.service';
import { Player } from '../match/enums/player.enums';

@Injectable()
export class TurnService {
  constructor(
    private readonly turnModel: TurnModel,
    @Inject(forwardRef(() => MatchService))
    private readonly matchService: MatchService,
  ) {}

  public async find(turn: Partial<Turn>): Promise<Turn[]> {
    return await this.turnModel.find(turn);
  }

  public async findLastOne(turn: Partial<Turn>): Promise<Turn> {
    return await this.turnModel.findLastOne(turn);
  }

  public async add(turn: Partial<Turn>): Promise<Turn> {
    return await this.turnModel.add(turn);
  }

  public async createTurn(
    turnPlayed: TurnPlayed,
    lastTurnPosted: Turn,
  ): Promise<Partial<Turn>> {
    const newTurn = {
      match_id: lastTurnPosted.match_id,
    };
    newTurn['turn_order'] = lastTurnPosted.turn_order + 1;
    for (let i = 1; i < 4; i++) {
      if (i === turnPlayed.pile) {
        this.newValueVerification(
          lastTurnPosted[`integer_${i}`],
          turnPlayed.value,
        );
        newTurn[`integer_${i}`] =
          lastTurnPosted[`integer_${i}`] - turnPlayed.value;
      } else {
        newTurn[`integer_${i}`] = lastTurnPosted[`integer_${i}`];
      }
    }

    if (this.lastTurnVerification(newTurn)) {
      await this.matchService.endGame({
        match_id: newTurn.match_id,
      });
    }
    return newTurn;
  }

  private newValueVerification(
    currentIntegerSelectedPile: number,
    value: number,
  ): boolean {
    if (currentIntegerSelectedPile < value) {
      throw new BadRequestException(
        'value must be less or equal than the integer corresponding to the pile number',
      );
    } else {
      return true;
    }
  }

  private lastTurnVerification(turn: Partial<Turn>): boolean {
    if (turn.integer_1 === 0 && turn.integer_2 === 0 && turn.integer_3 === 0) {
      return true;
    }
  }

  public async nextPlayer(lastTurnPosted: Turn): Promise<Player> {
    const { first_player } = await this.matchService.findOne({
      match_id: lastTurnPosted.match_id,
    });
    const turnsPlayed = lastTurnPosted.turn_order;
    if (turnsPlayed % 2 === 0) {
      return first_player;
    } else {
      const roles = new Set([Player.COMPUTER, Player.USER]);
      roles.delete(first_player);
      const iterator = roles.values();
      return iterator.next().value;
    }
  }
}
