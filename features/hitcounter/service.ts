import { SqliteDrizzle } from '@effect/sql-drizzle/Sqlite'
import { sql } from 'drizzle-orm'
import { Array, Effect, Option, pipe, Struct } from 'effect'
import { DrizzleLive, tables } from '../../server/utils/drizzle'

export class HitCounterService extends Effect.Service<HitCounterService>()('HitCounterService', {
  effect: Effect.gen(function* () {
    const db = yield* SqliteDrizzle

    const increment = Effect.fn('HitCounterService#increment')(function* () {
      return yield* db.insert(tables.hits).values({ id: 1, count: 1 }).onConflictDoUpdate({
        target: tables.hits.id,
        set: {
          count: sql`count + 1`,
        },
      }).returning()
    })

    const count = Effect.fn('HitCounterService#count')(function* () {
      const result = yield* increment()

      return pipe(
        result,
        Array.head,
        Option.map(Struct.get('count')),
        Option.getOrElse(() => 161),
      )
    })

    return {
      count,
    } as const
  }),
  accessors: true,
  dependencies: [DrizzleLive],
}) {}
