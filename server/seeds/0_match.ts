import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex.schema.raw(`
    TRUNCATE TABLE nim.match CASCADE;
  `);

  // Inserts seed entries
  await knex('nim.match').insert([
    {
      match_id: 'a9392766-2e7d-4b8a-87e8-ab9b0dc25a29',
      first_player: 'COMPUTER',
      winner: 'USER',
      match_finished: knex.fn.now(),
    },
    {
      match_id: 'dadbd149-5ca8-4b72-b12c-84572d145670',
      first_player: 'USER',
      winner: 'COMPUTER',
      match_finished: knex.fn.now(),
    },
    {
      match_id: '6b0fc914-4e24-49b5-a6e9-d4516e15e502',
      first_player: 'COMPUTER',
    },
  ]);
}
