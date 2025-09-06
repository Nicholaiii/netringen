import type { Status } from '~~/features/healthcheck/model'
import { Effect } from 'effect'

let status: Status = 'starting'
export const getScheduleStatus = Effect.sync((): Status => status)
const setScheduleStatus = (newStatus: Status): Status => status = newStatus

export default defineNitroPlugin(() => {
  setTimeout(() => setScheduleStatus('running'), 5000)
  setTimeout(() => setScheduleStatus('erroring'), 15000)
})
