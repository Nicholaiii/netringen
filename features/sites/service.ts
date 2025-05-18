import { SqliteDrizzle } from '@effect/sql-drizzle/Sqlite'
import { expect, layer } from '@effect/vitest'
import { Effect, Layer, Option, pipe, Schema } from 'effect'
import { DrizzleLive, DrizzleTest, SeedDatabase, tables, TestMigrationLayer } from '../../server/utils/drizzle'
import { mockClientWithResponse } from '../../test/fixtures/HttpClient'
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

if (import.meta.vitest) {
  const successDeps = Layer.mergeAll(
    SiteService.DefaultWithoutDependencies.pipe(
      Layer.provide(DrizzleTest),
    ),
    mockClientWithResponse(),
    HTMLParsingService.DefaultWithoutDependencies,
    URLParsingService.Default,
    DrizzleTest,
    TestMigrationLayer.pipe(
      Layer.provide(DrizzleTest),
    ),
  )

  layer(successDeps)('SiteService', async (it) => {
    it.effect('returns a list of sites', Effect.fn(function* () {
      const length = yield* SeedDatabase()

      const result = yield* SiteService.list()
      expect(result).not.toHaveLength(0)
      expect(result).toHaveLength(length)
    }))

    it.scoped('inserts new site submissions', Effect.fn(function* () {
      const result = yield* SiteService.insert('https://komputer.club/')
      expect(result.url).toBe('https://komputer.club/')
    }))
  })
}
