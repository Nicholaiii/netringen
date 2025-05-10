import type { SiteInsert } from "~~/server/utils/drizzle"
import { tryQuery } from "~~/server/utils/queries"

/**
 * Create an Effect for submitting a site to the collection.
 */
export const submitSite = (data: SiteInsert) => tryQuery(
  ({ db, tables }) => db.insert(tables.sites).values(data).returning()
)
