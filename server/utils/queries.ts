import type { QueryPromise } from 'drizzle-orm'
import { Data, Effect } from 'effect'

export class QueryError extends Data.TaggedError('QueryError')<{
  cause: unknown
}> {}

/**
 * Map an unknown error to a known Query Error
 * containing the origin error in it's cause property.
 */
export const mapToQueryError = (cause: unknown) => new QueryError({ cause })


/**
 * Make Drizzle queries in Effect.
 * TODO: Effect has a Drizzle integration, but docs are noop. Look into it on their support Discord
 */
export const tryQuery =  <R>(
  cb:({ db, tables }: ReturnType<typeof useDrizzle>) => QueryPromise<R>
) => DrizzleService.pipe(
  Effect.andThen(({ db, tables }) => Effect.tryPromise({
    try: async (): Promise<R> => await cb({ db, tables }),
    catch: mapToQueryError
  }))
)
