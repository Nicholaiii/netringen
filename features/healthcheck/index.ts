import { SqliteDrizzle } from '@effect/sql-drizzle/Sqlite'
import { Console, Effect, pipe } from 'effect'
import { HealthcheckData, type Status } from './model'

const dbStatus = SqliteDrizzle.pipe(
  Effect.flatMap(db => db.select().from(tables.sites).limit(0)),
)

const success: Effect.Effect<Status> = Effect.succeed('success')
const failure: Effect.Effect<Status> = Effect.succeed('failure')

const StatusPipeline = pipe(
  dbStatus,
  Effect.tapError(Console.error),
  Effect.flatMap(() => success),
  Effect.orElse(() => failure),
)

export const Healthcheck = Effect.fn('Healthcheck')(function* (upSince: Date, process: Pick<NodeJS.Process, 'uptime' | 'env' | 'version' | 'title' | 'pid' | 'cwd'>) {
  const status = yield* StatusPipeline
  const data = HealthcheckData.make({
    status,
    uptime: process.uptime(),
    upSince,
    localTime: new Date(),
    env: {
      nodeEnv: process.env.NODE_ENV ?? 'missing',
      nodeVersion: process.version,
      processName: process.title,
      pid: process.pid,
      cwd: process.cwd(),
    },
  })

  if (status === 'failure') {
    throw createError({
      status: 500,
      message: 'Healthcheck failed! :(',
      data,
    })
  }

  return data
})
