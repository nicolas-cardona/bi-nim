import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex.schema.raw(`
    TRUNCATE TABLE nim.turn CASCADE;
  `);

  // Inserts seed entries
  await knex('nim.turn').insert([
    {
      match_id: 'a9392766-2e7d-4b8a-87e8-ab9b0dc25a29',
      next_player: 'COMPUTER',
      integer_1: 1,
      integer_2: 1,
      turn_order: 0,
    },
    {
      match_id: 'a9392766-2e7d-4b8a-87e8-ab9b0dc25a29',
      next_player: 'USER',
      integer_1: 1,
      turn_order: 1,
    },
    {
      match_id: 'a9392766-2e7d-4b8a-87e8-ab9b0dc25a29',
      next_player: 'COMPUTER',
      turn_order: 2,
    },
    {
      match_id: 'dadbd149-5ca8-4b72-b12c-84572d145670',
      next_player: 'USER',
      integer_1: 3,
      integer_2: 2,
      integer_3: 1,
      turn_order: 0,
    },
    {
      match_id: 'dadbd149-5ca8-4b72-b12c-84572d145670',
      next_player: 'COMPUTER',
      integer_1: 3,
      integer_2: 2,
      turn_order: 1,
    },
    {
      match_id: 'dadbd149-5ca8-4b72-b12c-84572d145670',
      next_player: 'USER',
      integer_1: 2,
      integer_2: 2,
      turn_order: 2,
    },
    {
      match_id: 'dadbd149-5ca8-4b72-b12c-84572d145670',
      next_player: 'COMPUTER',
      integer_1: 2,
      turn_order: 3,
    },
    {
      match_id: 'dadbd149-5ca8-4b72-b12c-84572d145670',
      next_player: 'USER',
      turn_order: 4,
    },
    {
      match_id: '6b0fc914-4e24-49b5-a6e9-d4516e15e502',
      next_player: 'COMPUTER',
      integer_1: 4,
      integer_2: 3,
      integer_3: 2,
      turn_order: 0,
    },
  ]);
}
