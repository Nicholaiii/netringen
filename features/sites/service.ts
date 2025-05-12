import { Effect } from 'effect'
import { SqliteDrizzle } from '@effect/sql-drizzle/Sqlite'

export class SiteService extends Effect.Service<SiteService>()('SiteService', {
  effect: Effect.gen(function* () {
    const db = yield* SqliteDrizzle

    const list = Effect.fn('SiteService#list')(function* () {
      return yield* db.select().from(tables.sites)
    })

    return { list } as const
  }),
  accessors: true,
  dependencies: [DrizzleLive]
}) {}
