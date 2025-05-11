import { drizzle } from 'drizzle-orm/d1'
import { Context, Effect, Layer, } from 'effect'
import * as schema from '../database/schema'
import { layer as SqliteDrizzleLayer } from '@effect/sql-drizzle/Sqlite'
import * as D1Client from '@effect/sql-d1/D1Client'

export { sql, eq, and, or } from 'drizzle-orm'

export const tables = schema

/**
 * @deprecated use SqliteDrizzle service imported from @effect/sql-drizzle/Sqlite
 */
export function useDrizzle () {
  return {
    db: drizzle(hubDatabase(), { schema }),
    tables,
  }
}

/**
 * @deprecated use SqliteDrizzle service imported from @effect/sql-drizzle/Sqlite
 */
export class DrizzleService extends Context.Tag('DrizzleService')<
  DrizzleService,
  ReturnType<typeof useDrizzle>
>() {
  static live = () => useDrizzle()
}

const D1Live = D1Client.layer({
  // @ts-expect-error There is a version mismatch between the two libs, but the missing feature is a deprecated fn.
  db: hubDatabase()
})

export const DrizzleLive = SqliteDrizzleLayer.pipe(
  Layer.provide(D1Live)
)

export type SiteSelect = typeof schema.sites.$inferSelect
export type SiteInsert = typeof schema.sites.$inferInsert


