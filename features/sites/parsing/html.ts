import { FetchHttpClient } from '@effect/platform'
import * as HttpClient from '@effect/platform/HttpClient'
import { filterStatusOk } from '@effect/platform/HttpClientResponse'
import * as cheerio from 'cheerio'
import { Data, Effect } from 'effect'

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
