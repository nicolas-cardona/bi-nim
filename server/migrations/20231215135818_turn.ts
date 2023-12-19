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
      turn_order INTEGER NOT NULL,
      created_at TIMESTAMPTZ(3) DEFAULT NOW(),
      updated_at TIMESTAMPTZ(3) DEFAULT NOW(),
      deleted_at TIMESTAMPTZ(3)
    )
  `);

  // Trigger that updates automatically the column updated_at after updating a row
  await knex.schema.raw(`
    CREATE TRIGGER turn_set_updated_at
      BEFORE UPDATE ON nim.turn
      FOR EACH ROW
      EXECUTE PROCEDURE set_updated_at();
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.raw(`
    DROP TYPE IF EXISTS game_integers CASCADE;
  `);
  await knex.schema.withSchema('nim').dropTableIfExists('turn');
}
