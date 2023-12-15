import type { Knex } from 'knex';

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import path = require('path');

// Update with your config settings.

const { CLIENT, DATABASE, PG_USER, PASSWORD, HOST, PG_PORT } = process.env;

const config: Knex.Config = {
  client: CLIENT,
  connection: {
    database: DATABASE,
    user: PG_USER,
    password: PASSWORD,
    host: HOST,
    port: Number(PG_PORT),
  },
  migrations: {
    directory: path.join(__dirname, './migrations'),
  },
  seeds: {
    directory: path.join(__dirname, './seeds'),
  },
};

module.exports = config;
