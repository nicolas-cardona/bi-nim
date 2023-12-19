import knex from 'knex';
import { Injectable } from '@nestjs/common';
import * as KnexConfig from '../../knexfile';
import { Match } from './entities/match.entity';

const selectKey = [
  'match_id',
  'integer_1',
  'integer_2',
  'integer_3',
  'first_player',
  'winner',
  'match_finished',
  'created_at',
  'updated_at',
];
@Injectable()
export class MatchModel {
  constructor() {}

  private readonly database = knex({ ...KnexConfig });

  public async findOne(where: Partial<Match>): Promise<Match> {
    const match = await this.database('nim.match')
      .select(selectKey)
      .where(where)
      .whereNull('deleted_at')
      .first();
    return match === undefined ? null : match;
  }

  public async add(newMatch: Partial<Match>): Promise<Match> {
    const matchAdded = await this.database('nim.match')
      .insert(newMatch)
      .returning(selectKey);
    return matchAdded[0];
  }
}
