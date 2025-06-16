import { expect, layer } from '@effect/vitest'
import { Effect, Layer } from 'effect'
import { DrizzleTest, MigrationLayer, SeedDatabase } from '../../server/utils/drizzle'
import { mockClientWithResponse } from '../../test/fixtures/HttpClient'
import { HTMLParsingService } from './parsing/html'
import { URLParsingService } from './parsing/url'
import { SiteService } from './service'

const successDeps = Layer.mergeAll(
  SiteService.DefaultWithoutDependencies.pipe(
    Layer.provide(DrizzleTest),
  ),
  mockClientWithResponse(),
  HTMLParsingService.DefaultWithoutDependencies,
  URLParsingService.Default,
  DrizzleTest,
  MigrationLayer.pipe(
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
