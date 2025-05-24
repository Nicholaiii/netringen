import { createRequire } from 'node:module'
import { SqliteDrizzle, layer as SqliteDrizzleLayer } from '@effect/sql-drizzle/Sqlite'
import * as Sqlite from '@effect/sql-sqlite-node/SqliteClient'
import { faker } from '@faker-js/faker'
import { Console, Effect, Layer } from 'effect'
import * as schema from '../database/schema'

export const tables = schema

export const DrizzleLive = SqliteDrizzleLayer.pipe(
  Layer.provide(Sqlite.layer({
    filename: './database.db',
  })),
)

export type SiteSelect = typeof schema.sites.$inferSelect
export type SiteInsert = typeof schema.sites.$inferInsert

/**
 * Test fixtures
 */

export const DrizzleTest = SqliteDrizzleLayer.pipe(
  Layer.provide(Sqlite.layer({ filename: ':memory:' })),
)

/* Required for test fixtures. TODO: Verify if this is still true */
// eslint-disable-next-line no-restricted-globals
global.require = createRequire(import.meta.url)

const FakeSite = (): SiteInsert => ({
  name: faker.word.sample(),
  url: faker.internet.url({ appendSlash: true }),
})

export const SeedDatabase = Effect.fn('SeedDatabase')(function* () {
  const db = yield* SqliteDrizzle
  const length = 50
  faker.seed(161)

  yield* db.insert(schema.sites).values(Array.from({ length }).map(FakeSite))
  return length
})

export const TestMigrationLayer = Layer.effectDiscard(Effect.gen(function* () {
  const db = yield* SqliteDrizzle
  const { pushSQLiteSchema } = yield* Effect.tryPromise(() => import('drizzle-kit/api'))

  const { apply } = yield* Effect.tryPromise(() => pushSQLiteSchema(schema, db))
  yield* Effect.tryPromise(apply)
  return yield* Console.info('🧪 Test Migrations Complete')
}))
