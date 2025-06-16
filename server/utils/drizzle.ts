import { createRequire } from 'node:module'
import { SqliteDrizzle, layer as SqliteDrizzleLayer } from '@effect/sql-drizzle/Sqlite'
import * as Sqlite from '@effect/sql-sqlite-node/SqliteClient'
import { faker } from '@faker-js/faker'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
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

export const MigrationLayer = Layer.effectDiscard(Effect.gen(function* () {
  const db = yield* SqliteDrizzle

  yield* Effect.tryPromise(async () => await migrate(db, {
    migrationsFolder: './server/database/migrations',
    migrationsSchema: './server/database/schema.ts',
  }))

  return yield* Console.info('Migrations complete')
}))

export const Migration = Effect.gen(function* () {
  const db = yield* SqliteDrizzle

  yield* Effect.tryPromise(async () => await migrate(db, {
    migrationsFolder: './server/database/migrations',
    migrationsSchema: './server/database/schema.ts',
  }))

  return yield* Console.info('Migrations complete')
})
