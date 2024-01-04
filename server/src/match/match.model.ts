import knex from 'knex';
import { Injectable } from '@nestjs/common';
import * as KnexConfig from '../../knexfile';
import { Match } from './entities/match.entity';

const selectKey = [
  'match_id',
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

  public async find(where: Partial<Match>): Promise<Match[]> {
    const matches = await this.database('nim.match')
      .select(selectKey)
      .where(where)
      .whereNull('deleted_at');
    return matches === undefined ? null : matches;
  }

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

  public async update(
    where: Partial<Match>,
    update: Partial<Match>,
  ): Promise<Match> {
    const matchUpdated = await this.database('nim.match')
      .where(where)
      .whereNull('deleted_at')
      .update(update)
      .returning(selectKey);
    return matchUpdated === undefined ? null : matchUpdated[0];
  }
}
