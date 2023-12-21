import { Injectable } from '@nestjs/common';
import { TurnModel } from './turn.model';
import { Turn } from './entities/turn.entity';
import { TurnPlayed } from './dto/turn-played.dto';

@Injectable()
export class TurnService {
  constructor(private readonly turnModel: TurnModel) {}

  public async find(turn: Partial<Turn>): Promise<Turn[]> {
    return await this.turnModel.find(turn);
  }

  public async add(turn: Partial<Turn>): Promise<Turn> {
    return await this.turnModel.add(turn);
  }

  public async createTurn(turnPlayed: TurnPlayed): Promise<Partial<Turn>> {
    const newTurn = {
      match_id: turnPlayed.match_id,
    };

    const lastTurn = await this.turnModel.findLastOne({
      match_id: turnPlayed.match_id,
    });
    if (lastTurn) {
      newTurn['turn_order'] = lastTurn.turn_order + 1;
      for (let i = 1; i < 4; i++) {
        newTurn[`integer_${i}`] =
          lastTurn[`integer_${i}`] - (turnPlayed[`pile_${i}`] || 0);
      }
    }
    return newTurn;
  }
}
