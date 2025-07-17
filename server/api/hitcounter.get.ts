import { Console, Effect } from 'effect'
import { HitCounterService } from '~~/features/hitcounter/service'

const pipeline = HitCounterService.count().pipe(
  Effect.tapError(Console.warn),
  Effect.provide(HitCounterService.Default),
)

export default defineEventHandler(async () => await Effect.runPromise(
  pipeline,
).catch((e) => { throw createError(e) }))
