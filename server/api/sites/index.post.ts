import { FetchHttpClient } from '@effect/platform'
import { Console, Effect, Layer, pipe } from 'effect'
import { decodeUnknownSync } from 'effect/Schema'
import { HTMLParsingService } from '~~/features/sites/parsing/html'
import { URLParsingService } from '~~/features/sites/parsing/url'
import { SiteService } from '~~/features/sites/service'
import { validation } from '~~/features/sites/validation/index.post'

const deps = Layer.mergeAll(
  SiteService.Default,
  URLParsingService.Default,
  HTMLParsingService.Default,
  FetchHttpClient.layer,
)

const pipeline = Effect.fn('PostSite')(function* (url: string) {
  const result = yield* SiteService.insert(url).pipe(
    Effect.provide(deps),
  )

  return result
})

defineRouteMeta({
  openAPI: {
    description: 'Insert site',
    parameters: [{ in: 'query', name: 'url', required: true }],
  },
})

export default defineEventHandler(async (event) => {
  const { url } = await readValidatedBody(event, decodeUnknownSync(
    validation,
  ))

  return Effect.runPromise(pipe(
    pipeline(url),
    Effect.tapError(Console.warn),
  )).catch((e) => { throw createError(e) })
})
