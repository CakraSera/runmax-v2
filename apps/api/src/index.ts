import { serve } from '@hono/node-server'
import { app } from './app.js'

const port = Number(process.env.PORT ?? 3000)

serve(
  {
    fetch: app.fetch,
    port,
    hostname: '0.0.0.0', // required for Docker / containers
  },
  (info) => {
    console.log(`runmax api listening on http://0.0.0.0:${info.port}`)
  },
)
