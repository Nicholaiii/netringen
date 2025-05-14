import { HttpClient, HttpClientResponse } from '@effect/platform'
import { Effect, Layer } from 'effect'

export const mockClientWithResponse = (response: Response) => Layer.succeed(HttpClient.HttpClient, HttpClient.make(req =>
  Effect.succeed(
    HttpClientResponse.fromWeb(
      req,
      // Simulate a response from a server,
      response,
    ),
  ),
))
