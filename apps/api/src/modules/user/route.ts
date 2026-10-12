import { OpenAPIHono } from "@hono/zod-openapi";
import { createRoute } from "@hono/zod-openapi";
import { PublicUserSchema, UsersIdSchema, UsersSchema } from "./schema.js";

// User module — API list follows fitlex-api's user module (GET /, GET /{id}).
// Schemas are adjusted to apps/api/src/lib/db/schema.ts (uuid id, varchar limits).
// TODO(mount): in app.ts, mount userRoute at "/users" (the comment there says
// TODO(mount): `userRoutes` — rename it to `userRoute` to match this export).
export const userRoute = new OpenAPIHono();

// GET / — list users
userRoute.openapi(
  createRoute({
    method: "get",
    path: "/",
    tags: ["User"],
    summary: "List users",
    responses: {
      200: {
        description: "List of users (public fields only)",
        content: {
          "application/json": {
            schema: UsersSchema,
          },
        },
      },
    },
  }),
  async (c) => {
    // TODO(step 1): import the drizzle client `db` from "../../lib/db"
    // TODO(step 1): and the `users` table from "../../lib/db/schema.js"
    // TODO(step 2): query the `users` table for all rows
    // TODO(step 3): select ONLY id, username, full_name, created_at, updated_at
    // TODO(step 3): — this list is public, so never include email here
    // TODO(step 4): return the rows as JSON — shape must match UsersSchema
    // TODO(step 4): (an array of public users)
  },
);

// GET /{id} — user by ID
userRoute.openapi(
  createRoute({
    method: "get",
    path: "/{id}",
    tags: ["User"],
    summary: "Get user by ID",
    request: {
      params: UsersIdSchema,
    },
    responses: {
      200: {
        description: "User by ID (public fields only)",
        content: {
          "application/json": {
            schema: PublicUserSchema,
          },
        },
      },
      404: { description: "User not found" },
    },
  }),
  async (c) => {
    // TODO(step 1): read the `id` path param — UsersIdSchema already
    // TODO(step 1): validated it as a UUID before your handler runs
    // TODO(step 2): query the `users` table where id equals the param
    // TODO(step 3): select id, username, full_name, created_at, updated_at
    // TODO(step 3): — omit email, the response is PublicUserSchema
    // TODO(step 4): if no row came back, return a 404 ("User not found")
    // TODO(step 5): otherwise return the row as JSON — shape must match
    // TODO(step 5): PublicUserSchema
  },
);
