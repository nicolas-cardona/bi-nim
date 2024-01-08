import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
  await knex.schema.createSchemaIfNotExists('nim');
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropSchemaIfExists('nim');
}
