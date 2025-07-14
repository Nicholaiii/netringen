import { Effect, Schema } from 'effect'
import { decodeUnknownSync } from 'effect/ParseResult'
import { Site } from '~~/features/sites/model'
import { SiteService } from '~~/features/sites/service'

const pipeline = (all: boolean = false) => SiteService.list(all).pipe(
  Effect.flatMap(Schema.decode(Schema.Array(Site))),
  Effect.provide(SiteService.Default),
)

const QueryParameters = Schema.Struct({
  all: Schema.BooleanFromString.pipe(
    Schema.optional,
  ),
})

defineRouteMeta({
  openAPI: {
    description: 'List sites',
    parameters: [{ in: 'query', name: 'all', required: false, description: 'Include inactive sites (default: false)' }],
  },
})

export default defineEventHandler(async (event) => {
  const { all } = await getValidatedQuery(event, decodeUnknownSync(
    QueryParameters,
  ))

  return await Effect.runPromise(pipeline(all))
})
