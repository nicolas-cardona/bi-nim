import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex.schema.raw(`
    TRUNCATE TABLE nim.turn CASCADE;
  `);

  // Inserts seed entries
  await knex('nim.turn').insert([
    {
      // turn_id:
      match_id: 'a9392766-2e7d-4b8a-87e8-ab9b0dc25a29',
      integer_1: 1,
      turn_order: 1,
    },
    {
      // turn_id:
      match_id: 'a9392766-2e7d-4b8a-87e8-ab9b0dc25a29',
      turn_order: 2,
    },
    {
      // turn_id:
      match_id: 'dadbd149-5ca8-4b72-b12c-84572d145670',
      integer_1: 3,
      integer_2: 2,
      turn_order: 1,
    },
    {
      // turn_id:
      match_id: 'dadbd149-5ca8-4b72-b12c-84572d145670',
      integer_1: 2,
      integer_2: 2,
      turn_order: 2,
    },
    {
      // turn_id:
      match_id: 'dadbd149-5ca8-4b72-b12c-84572d145670',
      integer_1: 2,
      turn_order: 3,
    },
    {
      // turn_id:
      match_id: 'dadbd149-5ca8-4b72-b12c-84572d145670',
      turn_order: 4,
    },
  ]);
}
