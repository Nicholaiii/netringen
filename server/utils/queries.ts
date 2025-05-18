import { Data } from 'effect'

export class QueryError extends Data.TaggedError('QueryError')<{
  cause: unknown
}> {}

/**
 * Map an unknown error to a known Query Error
 * containing the origin error in it's cause property.
 */
export const mapToQueryError = (cause: unknown) => new QueryError({ cause })
