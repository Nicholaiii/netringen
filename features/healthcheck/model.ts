import { Effect, Schema } from 'effect'

export const Status = Schema.Literal('running', 'erroring', 'starting')
export type Status = typeof Status.Type

export const running: Effect.Effect<Status> = Effect.succeed('running')
export const erroring: Effect.Effect<Status> = Effect.succeed('erroring')
export const starting: Effect.Effect<Status> = Effect.succeed('starting')

export const HealthcheckData = Schema.Struct({
  status: Status,
  uptime: Schema.Number,
  upSince: Schema.Date,
  localTime: Schema.Date,
  env: Schema.Struct({
    nodeEnv: Schema.String,
    nodeVersion: Schema.String,
    processName: Schema.String,
    pid: Schema.Number,
    cwd: Schema.String,
  }),
})
