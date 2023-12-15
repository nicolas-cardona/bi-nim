import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
  // Function to update automatically column updated_at when updating a row of a table
  await knex.schema.raw(`
    CREATE OR REPLACE FUNCTION set_updated_at() RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);
  await knex.schema.createSchemaIfNotExists('nim-game');
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropSchemaIfExists('nim-game');
}
