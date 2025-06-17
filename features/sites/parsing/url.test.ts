import { expect, layer } from '@effect/vitest'
import { Effect } from 'effect'
import { IllegalArgumentException } from 'effect/Cause'
import { URLParsingService } from './url'

layer(URLParsingService.Default)('URLParsingService', (it) => {
  it.effect('returns a correctly parsed URL', () => Effect.gen(function* () {
    const result = yield* URLParsingService.parse('https://komputer.club')
    expect(result).toBeInstanceOf(URL)
    expect(result).toHaveProperty('hostname', 'komputer.club')
  }))

  it.effect('enforces tls', () => Effect.gen(function* () {
    const result = yield* URLParsingService.parse('http://komputer.club')
    expect(result).toHaveProperty('protocol', 'https:')
  }))

  it.effect('only allows proper FQDN URLs', () => Effect.gen(function* () {
    const result1 = yield* URLParsingService.parse('https://127.0.0.1').pipe(Effect.flip)
    const result2 = yield* URLParsingService.parse('https://localhost').pipe(Effect.flip)
    const result3 = yield* URLParsingService.parse('very-evil').pipe(Effect.flip)
    const result4 = yield* URLParsingService.parse('http://du.ck:1337')

    expect(result1).toBeInstanceOf(IllegalArgumentException)
    expect(result2).toBeInstanceOf(IllegalArgumentException)
    expect(result3).toBeInstanceOf(IllegalArgumentException)
    expect(result4).toBeInstanceOf(URL)
  }))
})
