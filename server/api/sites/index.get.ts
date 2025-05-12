import { Effect, Schema } from 'effect'
import { Site } from '~~/features/sites/model'
import { SiteService } from '~~/features/sites/service'

export default defineEventHandler(async () => {
  const pipeline =
    SiteService.list().pipe(
    Effect.flatMap(Schema.decode(Schema.Array(Site))),
    Effect.provide(SiteService.Default),
    Effect.provide(DrizzleLive())
  )

  return await Effect.runPromise(pipeline)
})

