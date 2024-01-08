import knex from 'knex';
import { Injectable } from '@nestjs/common';
import * as KnexConfig from '../../knexfile';
import { Turn } from './entities/turn.entity';

const returnRows = [
  'turn_id',
  'match_id',
  'integer_1',
  'integer_2',
  'integer_3',
  'turn_order',
  'created_at',
];

@Injectable()
export class TurnModel {
  constructor() {}

  private readonly database = knex({ ...KnexConfig });

  public async findLastOne(where: Partial<Turn>): Promise<Turn> {
    const turn = await this.database('nim.turn')
      .select(returnRows)
      .where(where)
      .orderBy('turn_order', 'desc')
      .first();
    return turn === undefined ? null : turn;
  }

  public async find(where: Partial<Turn>): Promise<Turn[]> {
    const turnsList = await this.database('nim.turn')
      .select(returnRows)
      .where(where)
      .orderBy('turn_order', 'desc');
    return turnsList === undefined ? null : turnsList;
  }

  public async add(newTurn: Partial<Turn>): Promise<Turn> {
    const turnAdded = await this.database('nim.turn')
      .insert(newTurn)
      .returning(returnRows);
    return turnAdded[0];
  }
}
