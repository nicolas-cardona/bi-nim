import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
  // Function to update automatically column match_finished when a winner is declared
  await knex.schema.raw(`
    CREATE OR REPLACE FUNCTION set_match_finished() RETURNS TRIGGER AS $$
    BEGIN
      IF NEW.winner IS DISTINCT FROM OLD.winner THEN
        NEW.match_finished = NOW();
      END IF;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);
  await knex.schema.createSchemaIfNotExists('nim');
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropSchemaIfExists('nim');
}
