import { drizzle } from 'drizzle-orm/d1'
import { Context } from 'effect'
import * as schema from '../database/schema'

export { sql, eq, and, or } from 'drizzle-orm'

export const tables = schema

export function useDrizzle () {
  return {
    db: drizzle(hubDatabase(), { schema }),
    tables,
  }
}

export class DrizzleService extends Context.Tag('DrizzleService')<
  DrizzleService,
  ReturnType<typeof useDrizzle>
>() {
  static live = () => useDrizzle()
}

export type Site = typeof schema.sites.$inferSelect
