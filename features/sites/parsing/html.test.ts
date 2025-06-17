import { HttpClientError } from '@effect/platform'
import { expect, layer } from '@effect/vitest'
import { Effect, Layer } from 'effect'
import { mockClientWithResponse } from '../../../test/fixtures/HttpClient'
import { HTMLParsingService } from './html'

const successDeps = Layer.merge(
  mockClientWithResponse(new Response('bar')),
  HTMLParsingService.DefaultWithoutDependencies,
)

layer(successDeps)('HTMLParsingService', (it) => {
  it.effect('parses html', () => Effect.gen(function* () {
    const result = yield* HTMLParsingService.parseSite(`<div>foo</div>`)
    expect(result('div').text()).toBe('foo')
  }))

  it.effect('loads bodies', () => Effect.gen(function* () {
    const result = yield* HTMLParsingService.loadSite(new URL('http://foo'))
    expect(result).toBe('bar')
  }))

  it.layer(mockClientWithResponse(new Response('baz', { status: 400 })))((it) => {
    it.effect('fails on non-2xx status', () => Effect.gen(function* () {
      const result = yield* HTMLParsingService.loadSite(new URL('http://evil')).pipe(Effect.flip)
      expect(result).toBeInstanceOf(HttpClientError.ResponseError)
    }))
  })
})
