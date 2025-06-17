import type { SiteInsert } from '~~/server/utils/drizzle'
import { SqliteDrizzle } from '@effect/sql-drizzle/Sqlite'
import { Effect } from 'effect'

/**
 * Create an Effect for submitting a site to the collection.
 */
export function submitSite (data: SiteInsert) {
  return SqliteDrizzle.pipe(
    Effect.flatMap(db => db.insert(tables.sites).values(data).returning()),
  )
}
