import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import { Scalar } from '@scalar/hono-api-reference'

const healthRoute = createRoute({
  method: 'get',
  path: '/health',
  tags: ['System'],
  summary: 'Health check',
  responses: {
    200: {
      description: 'Service is up',
      content: {
        'application/json': {
          schema: z.object({ status: z.literal('ok') }),
        },
      },
    },
  },
})

export const app = new OpenAPIHono()

app.openapi(healthRoute, (c) => c.json({ status: 'ok' }))

app.route(
  '/docs',
  Scalar.serve({
    document: () =>
      app.getOpenAPI31Document({
        openapi: '3.1.0',
        info: {
          title: 'Runmax API',
          version: '1.0.0',
        },
      }),
  }),
)
