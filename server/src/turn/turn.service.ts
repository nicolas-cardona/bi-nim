import { BadRequestException, Injectable } from '@nestjs/common';
import { TurnModel } from './turn.model';
import { Turn } from './entities/turn.entity';
import { TurnPlayed } from './dto/turn-played.dto';
import { StrategyService } from 'src/strategy/strategy.service';
import { StrategySelected } from './dto/strategy-selected.dto';
import { ComputerStrategy } from './enums/computer-strategy.enums';

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
        this.valuesVerification(
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
      
    }
    return newTurn;
  }

  public async createComputerTurnPlayed(
    lastTurnPosted: Turn,
    strategySelected: StrategySelected,
  ): Promise<TurnPlayed> {
    const turnPlayed = {
      pile: null,
      value: null,
    };
    const integersArray = [
      lastTurnPosted.integer_1,
      lastTurnPosted.integer_2,
      lastTurnPosted.integer_3,
    ];

    let selection = null;
    if (strategySelected.strategy === ComputerStrategy.WINNING) {
      selection = this.strategyService.selectionWinningStrategy(integersArray);
    }

    if (
      selection === null ||
      strategySelected.strategy === ComputerStrategy.RANDOM
    ) {
      selection = this.strategyService.selectionRandomStrategy(integersArray);
    }

    const comparing = (integer: number) => integer === selection[0];
    turnPlayed.pile = integersArray.findIndex(comparing) + 1;
    turnPlayed.value = selection[1];

    return turnPlayed;
  }

  private valuesVerification(
    currentIntegerSelectedPile: number,
    value: number,
  ): boolean {
    if (currentIntegerSelectedPile < value) {
      throw new BadRequestException(
        'value must be lesser or equal than the integer corresponding to the pile number',
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
}
