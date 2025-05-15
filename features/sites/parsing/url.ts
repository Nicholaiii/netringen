import { Url } from '@effect/platform'
import { expect, layer } from '@effect/vitest'
import { Effect, Either, pipe } from 'effect'
import { IllegalArgumentException } from 'effect/Cause'

export class URLParsingService extends Effect.Service<URLParsingService>()('URLParsingService', {
  sync: () => {
    const isFQDN = (hostname: string): boolean => {
      const pattern = /^(?!:\/\/)(?=.{1,255}$)(?:.{1,63}\.){1,127}(?!\d*$)[a-z0-9-]+\.?$/im
      return pattern.test(hostname)
    }

    const parse = (maybeUrl: string) => pipe(
      Url.fromString(maybeUrl),
      Either.filterOrLeft(
        url => isFQDN(url.hostname),
        () => new IllegalArgumentException('Only FQDN allowed'),
      ),
      Either.map(Url.setProtocol('https:')),
    )

    return {
      parse,
    } as const
  },
  accessors: true,
}) {}

if (import.meta.vitest) {
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
}
