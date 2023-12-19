import knex from 'knex';
import { Injectable } from '@nestjs/common';
import * as KnexConfig from '../../knexfile';

@Injectable()
export class MatchModel {
  constructor() {}

  private readonly database = knex({ ...KnexConfig });
}
