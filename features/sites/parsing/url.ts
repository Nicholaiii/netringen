import { Url } from '@effect/platform'
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
