import { SqliteDrizzle } from '@effect/sql-drizzle/Sqlite'
import { Effect, Option, pipe, Schema } from 'effect'
import { DrizzleLive, tables } from '../../server/utils/drizzle'
import { Site, SiteInsert } from './model'
import { HTMLParsingService } from './parsing/html'
import { URLParsingService } from './parsing/url'

export class SiteService extends Effect.Service<SiteService>()('SiteService', {
  effect: Effect.gen(function* () {
    const db = yield* SqliteDrizzle

    const list = Effect.fn('SiteService#list')(function* () {
      return yield* db.select().from(tables.sites)
    })

    const insert = Effect.fn('SiteService#insert')(function* (maybeUrl: string) {
      const url = yield* URLParsingService.parse(maybeUrl)
      const body = yield* HTMLParsingService.loadSite(url)
      const $ = yield* HTMLParsingService.parseSite(body)
      // TODO: Consider checking <meta> application-name first, as <title> may contain extraneous data
      const name = $('title').text()

      const site = SiteInsert.make({
        url: url.toString(),
        name,
      })

      const [result] = yield* db.insert(tables.sites).values(site).returning()

      return yield* pipe(
        Option.fromNullable(result),
        Effect.andThen(Schema.decodeOption(Site)),
      )
    })

    return {
      list,
      insert,
    } as const
  }),
  accessors: true,
  dependencies: [DrizzleLive],
}) {}
