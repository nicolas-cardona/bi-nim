import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(`
    CREATE TYPE player AS ENUM ('COMPUTER', 'USER');
  `);

  await knex.schema.raw(`
    CREATE TABLE IF NOT EXISTS nim.match(
      match_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      first_player player NOT NULL,
      winner player,
      match_finished TIMESTAMPTZ(3),
      created_at TIMESTAMPTZ(3) DEFAULT NOW()
    );
  `);

  // Trigger that updates the column match_finished
  await knex.schema.raw(`
    CREATE TRIGGER set_match_finished_trigger
      BEFORE UPDATE ON nim.match
      FOR EACH ROW
      EXECUTE PROCEDURE set_match_finished();
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.raw(`
    DROP TYPE IF EXISTS player CASCADE;
  `);
  await knex.schema.withSchema('nim').dropTableIfExists('match');
}
