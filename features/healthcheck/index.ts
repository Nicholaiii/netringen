import type { Status } from './model'
import { SqliteDrizzle } from '@effect/sql-drizzle/Sqlite'
import { Console, Effect, Match, pipe } from 'effect'
import { getScheduleStatus } from '~~/server/plugins/scheduling'
import { erroring, HealthcheckData } from './model'

const dbStatus = SqliteDrizzle.pipe(
  Effect.flatMap(db => db.select().from(tables.sites).limit(0)),
)

const scheduleStatus = getScheduleStatus.pipe(
  Effect.andThen(Match.type<Status>().pipe(
    Match.when('erroring', () => Effect.fail('Schedule is failing' as const)),
    Match.orElse(s => Effect.succeed(s)),
  )),
)

const StatusPipeline = pipe(
  dbStatus,
  Effect.flatMap(() => scheduleStatus),
  Effect.tapError(Console.error),
  Effect.orElse(() => erroring),
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

  if (status === 'erroring') {
    throw createError({
      status: 500,
      message: 'Healthcheck failed! :(',
      data,
    })
  }

  return data
})
