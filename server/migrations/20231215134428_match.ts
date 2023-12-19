import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(`
    CREATE TYPE player AS ENUM ('COMPUTER', 'USER');
  `);

  await knex.schema.raw(`
    CREATE TABLE IF NOT EXISTS nim.match(
      match_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      integer_1 INTEGER NOT NULL,
      integer_2 INTEGER NOT NULL,
      integer_3 INTEGER DEFAULT 0,
      first_player player NOT NULL,
      winner player,
      match_finished BOOLEAN DEFAULT false,
      created_at TIMESTAMPTZ(3) DEFAULT NOW(),
      updated_at TIMESTAMPTZ(3) DEFAULT NOW(),
      deleted_at TIMESTAMPTZ(3)
    );
  `);

  // Trigger that updates automatically the column updated_at after updating a row
  await knex.schema.raw(`
    CREATE TRIGGER match_set_updated_at
      BEFORE UPDATE ON nim.match
      FOR EACH ROW
      EXECUTE PROCEDURE set_updated_at();
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.raw(`
    DROP TYPE IF EXISTS player CASCADE;
  `);
  await knex.schema.withSchema('nim').dropTableIfExists('match');
}
