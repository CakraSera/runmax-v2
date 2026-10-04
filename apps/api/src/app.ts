import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
// Import routes
import { healthRoute } from "./modules/health/route.js";
import { authRoute } from "./modules/auth/route.js";

export const app = new OpenAPIHono();
app.use(logger());
app.use("*", cors());

app.route("/health", healthRoute);
app.route("/auth", authRoute);
// app.route("/users", userRoutes);

app.route(
  "/docs",
  Scalar.serve({
    document: () =>
      app.getOpenAPI31Document({
        openapi: "3.1.0",
        info: {
          title: "Runmax API",
          version: "1.0.0",
        },
      }),
  }),
);
