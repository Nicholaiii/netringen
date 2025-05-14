import { FetchHttpClient, HttpClientError } from '@effect/platform'
import * as HttpClient from '@effect/platform/HttpClient'
import { filterStatusOk } from '@effect/platform/HttpClientResponse'
import { expect, it } from '@effect/vitest'
import * as cheerio from 'cheerio'
import { Data, Effect } from 'effect'
import { mockClientWithResponse } from '../../../test/fixtures/HttpClient'

export class CheerioError extends Data.TaggedError('CheerioError')<{
  cause: unknown
}> {}

export class HTMLParsingService extends Effect.Service<HTMLParsingService>()('HTMLParsingService', {
  effect: Effect.gen(function* () {
    const parseSite = (html: string) => Effect.try({
      try: () => cheerio.load(html),
      catch: cause => new CheerioError({ cause }),
    })

    const loadSite = Effect.fn('HTMLParsingService#loadSite')(function* (url: URL) {
      const response = yield* HttpClient.get(url)
      yield* filterStatusOk(response)
      return yield* response.text
    })

    return {
      loadSite,
      parseSite,
    } as const
  }),
  accessors: true,
  dependencies: [FetchHttpClient.layer],
}) {}

if (import.meta.vitest) {
  const test = import.meta.vitest
  test.describe('HTMLParsingService', () => {
    it.effect('parses html', () => Effect.gen(function* () {
      const result = yield* HTMLParsingService.parseSite(`<div>foo</div>`)
      expect(result('div').text()).toBe('foo')
    }).pipe(Effect.provide(HTMLParsingService.Default)))

    it.effect('loads bodies', () => Effect.gen(function* () {
      const result = yield* HTMLParsingService.loadSite(new URL('http://foo'))
      expect(result).toBe('bar')
    }).pipe(
      Effect.provide(mockClientWithResponse(new Response('bar'))),
      Effect.provide(HTMLParsingService.DefaultWithoutDependencies),
    ))

    it.effect('fails on non-2xx status', () => Effect.gen(function* () {
      const result = yield* HTMLParsingService.loadSite(new URL('http://evil')).pipe(Effect.flip)
      expect(result).toBeInstanceOf(HttpClientError.ResponseError)
    }).pipe(
      Effect.provide(mockClientWithResponse(new Response('baz', { status: 400 }))),
      Effect.provide(HTMLParsingService.DefaultWithoutDependencies),
    ))
  })
}
