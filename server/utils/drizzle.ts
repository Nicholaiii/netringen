import * as D1Client from '@effect/sql-d1/D1Client'
import { layer as SqliteDrizzleLayer } from '@effect/sql-drizzle/Sqlite'
import { Layer } from 'effect'

import * as schema from '../database/schema'

export { and, eq, or, sql } from 'drizzle-orm'

export const tables = schema

const D1Live = Layer.suspend(() => D1Client.layer({
  db: hubDatabase() as D1Client.D1ClientConfig['db'],
}))

export const DrizzleLive = SqliteDrizzleLayer.pipe(
  Layer.provide(D1Live),
)

export type SiteSelect = typeof schema.sites.$inferSelect
export type SiteInsert = typeof schema.sites.$inferInsert
