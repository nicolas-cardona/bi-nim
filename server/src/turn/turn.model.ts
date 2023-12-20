import knex from 'knex';
import { Injectable } from '@nestjs/common';
import * as KnexConfig from '../../knexfile';

const selectKey = [];

@Injectable()
export class TurnModel {
  constructor() {}

  private readonly database = knex({ ...KnexConfig });
}
