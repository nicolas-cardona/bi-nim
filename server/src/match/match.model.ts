import knex from 'knex';
import { Injectable } from '@nestjs/common';
import * as KnexConfig from '../../knexfile';
import { Match } from './entities/match.entity';
import { Turn } from '../turn/entities/turn.entity';

const responseColumns = [
  'match_id',
  'first_player',
  'winner',
  'match_finished',
  'created_at',
];

const turnResponseColumns = [
  'turn_id',
  'match_id',
  'integer_1',
  'integer_2',
  'integer_3',
  'turn_order',
  'created_at',
];
@Injectable()
export class MatchModel {
  constructor() {}

  private readonly database = knex({ ...KnexConfig });

  public async find(where: Partial<Match>): Promise<Match[]> {
    const matches = await this.database('nim.match')
      .select(responseColumns)
      .where(where);
    return matches === undefined ? null : matches;
  }

  public async findOne(where: Partial<Match>): Promise<Match> {
    const match = await this.database('nim.match')
      .select(responseColumns)
      .where(where)
      .first();
    return match === undefined ? null : match;
  }

  public async addWithTurnTransaction(
    newMatch: Partial<Match>,
    newTurn: Partial<Turn>,
  ): Promise<[Match, Turn]> {
    const trxProvider = this.database.transactionProvider();
    const trx = await trxProvider();

    const matchAdded = await trx('nim.match')
      .insert(newMatch)
      .returning(responseColumns);

    newTurn.match_id = matchAdded[0].match_id;
    const turnAdded = await trx('nim.turn')
      .insert(newTurn)
      .returning(turnResponseColumns);

    await trx.commit();
    return [matchAdded[0], turnAdded[0]];
  }

  public async update(
    where: Partial<Match>,
    update: Partial<Match>,
  ): Promise<Match> {
    const matchUpdated = await this.database('nim.match')
      .where(where)
      .update(update)
      .returning(responseColumns);
    return matchUpdated === undefined ? null : matchUpdated[0];
  }
}
