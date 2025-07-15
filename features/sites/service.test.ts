import { expect, layer } from '@effect/vitest'
import { Effect, Layer, pipe } from 'effect'
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

const SeedMemoised = Effect.flatten(Effect.cached(SeedDatabase()))

layer(successDeps)('SiteService', async (it) => {
  it.effect('returns a list of all sites', Effect.fn(function* () {
    const length = yield* SeedMemoised

    const result = yield* SiteService.list(true)
    expect(result).not.toHaveLength(0)
    expect(result).toHaveLength(length)
  }))

  it.effect('returns a list of activated sites', Effect.fn(function* () {
    const length = yield* SeedMemoised

    const result = yield* SiteService.list()
    expect(result).not.toHaveLength(0)
    expect(result).not.toHaveLength(length)
  }))

  it.scoped('inserts new site submissions', Effect.fn(function* () {
    const result = yield* SiteService.insert('https://komputer.club/')
    expect(result.url).toBe('https://komputer.club/')
  }))
})
