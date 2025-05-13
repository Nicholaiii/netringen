import { FetchHttpClient } from '@effect/platform'
import { HttpClient } from '@effect/platform/HttpClient'
import * as cheerio from 'cheerio'
import { Data, Effect } from 'effect'

export class CheerioError extends Data.TaggedError('CheerioError')<{
  cause: unknown
}> {}

export class HTMLParsingService extends Effect.Service<HTMLParsingService>()('HTMLParsingService', {
  effect: Effect.gen(function* () {
    const http = yield* HttpClient

    const loadSite = (url: URL) => http.get(url, { accept: 'text/html' }).pipe(
      Effect.map(res => res.toString()),
      Effect.flatMap(body => Effect.try(
        () => cheerio.load(body),
      ).pipe(
        Effect.catchAll(cause => new CheerioError({ cause })),
      )),
    )

    return {
      loadSite,
    } as const
  }),
  accessors: true,
  dependencies: [FetchHttpClient.layer],
}) {}
