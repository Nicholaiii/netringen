import process from 'node:process'
import { Effect } from 'effect'
import { Healthcheck } from '~~/features/healthcheck'

const startTime = new Date()

export default defineEventHandler(async () => await Effect.runPromise(
  Healthcheck(startTime, process).pipe(
    Effect.provide(DrizzleLive),
  ),
))
