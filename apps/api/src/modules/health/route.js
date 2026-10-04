import { OpenAPIHono } from "@hono/zod-openapi";
import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";

export const healthRoute = new OpenAPIHono();
healthRoute.openapi(
  createRoute({
    method: "get",
    path: "/",
    tags: ["System"],
    summary: "Health check",
    responses: {
      200: {
        description: "Service is up",
        content: {
          "application/json": {
            schema: z.object({
              status: z.string().default("ok"),
            }),
          },
        },
      },
    },
  }),
  async (c) => {
    return c.json({ status: "ok" });
  },
);
