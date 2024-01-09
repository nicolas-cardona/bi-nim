import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(`
    CREATE TYPE game_integers AS ENUM ('INTEGER_1', 'INTEGER_2', 'INTEGER_3');
  `);

  await knex.raw(`
    CREATE TABLE IF NOT EXISTS nim.turn(
      turn_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      match_id UUID REFERENCES nim.match(match_id) NOT NULL,
      integer_1 INTEGER DEFAULT 0,
      integer_2 INTEGER DEFAULT 0,
      integer_3 INTEGER DEFAULT 0,
      turn_order INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ(3) DEFAULT NOW()
    );
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.raw(`
    DROP TYPE IF EXISTS game_integers CASCADE;
  `);
  await knex.schema.withSchema('nim').dropTableIfExists('turn');
}
