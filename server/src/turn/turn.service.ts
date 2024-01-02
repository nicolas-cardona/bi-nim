import { Injectable } from '@nestjs/common';
import { TurnModel } from './turn.model';
import { Turn } from './entities/turn.entity';
import { TurnPlayed } from './dto/turn-played.dto';
import { StrategyService } from 'src/strategy/strategy.service';

@Injectable()
export class TurnService {
  constructor(
    private readonly turnModel: TurnModel,
    private readonly strategyService: StrategyService,
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

  // TODO: delete match_id from turnPlayed
  // change dto turnPlayed: pileNumber y value instead of pile_1, etc
  public async createTurn(
    turnPlayed: TurnPlayed,
    lastTurnPosted: Turn,
  ): Promise<Partial<Turn>> {
    const newTurn = {
      match_id: turnPlayed.match_id,
    };
    newTurn['turn_order'] = lastTurnPosted.turn_order + 1;
    for (let i = 1; i < 4; i++) {
      newTurn[`integer_${i}`] =
        lastTurnPosted[`integer_${i}`] - (turnPlayed[`pile_${i}`] || 0);
    }
    return newTurn;
  }

  public async createComputerTurnPlayed(
    lastTurnPosted: Turn,
  ): Promise<TurnPlayed> {
    const turnPlayed = {
      match_id: lastTurnPosted.match_id,
    };

    const array = [
      lastTurnPosted.integer_1,
      lastTurnPosted.integer_2,
      lastTurnPosted.integer_3,
    ];

    const selection = this.strategyService.selectionWithStrategy(array);
    if (selection) {
      const comparing = (integer: number) => integer === selection[0];
      const index = array.findIndex(comparing);
      turnPlayed[`pile_${index}`] = selection[1];
    }
    return turnPlayed;
  }
}
