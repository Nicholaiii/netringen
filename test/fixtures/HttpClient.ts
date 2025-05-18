import { HttpClient, HttpClientResponse } from '@effect/platform'
import { Effect, Layer } from 'effect'

export const IdealSite = `
<!doctype html>
<html lang=en>
  <head>
    <meta charset=utf-8>
    <title>komputer.club</title>
  </head>
  <body>
    <p>Nothing here.</p>
  </body>
</html>
`

export const mockClientWithResponse = (response: Response = new Response(IdealSite)) => Layer.succeed(HttpClient.HttpClient, HttpClient.make(req =>
  Effect.succeed(
    HttpClientResponse.fromWeb(
      req,
      // Simulate a response from a server,
      response,
    ),
  ),
))
