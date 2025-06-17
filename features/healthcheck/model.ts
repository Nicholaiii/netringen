import { Schema } from 'effect'

export const Status = Schema.Literal('success', 'failure')
export type Status = typeof Status.Type

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
