import { SqliteDrizzle } from "@effect/sql-drizzle/Sqlite"
import { Effect } from "effect"
import type { SiteInsert } from "~~/server/utils/drizzle"

/**
 * Create an Effect for submitting a site to the collection.
 */
export const submitSite = (data: SiteInsert) => SqliteDrizzle.pipe(
  Effect.flatMap(db => db.insert(tables.sites).values(data).returning())
)
