import { OpenAPIHono } from "@hono/zod-openapi";
import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";

import { AuthRegisterSchema } from "./schema.js";
import { PrivateUserSchema } from "../user/schema.js";

// TODO(auth MVP): 7 endpoints — register, login, refresh, logout, me, forgot-password, reset-password
// TODO(auth MVP): token strategy — JWT access (~15 min) + rotating opaque refresh (~30 days, hashed at rest)
// TODO(auth MVP): password hashing (argon2id or bcrypt); never store plaintext
// TODO(mount): mount authRoute at "/auth" in app.ts (currently commented out)

// TODO(login): request schema (email, password), zod-validated
// TODO(login): verify credentials; 401 with generic message (no user enumeration)
// TODO(login): return { access token, refresh token } on success
// TODO(login): rate limit per IP + email
// TODO(login): fix OpenAPI metadata — tags: ["Auth"], summary "Login"
//Login
export const authRoute = new OpenAPIHono();
authRoute.openapi(
  createRoute({
    method: "post",
    path: "/login",
    tags: ["Auth"],
    summary: "Login User",
    responses: {
      200: {
        description: "Login successful",
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

// TODO(register): request schema (email, password), zod-validated; min password length
// TODO(register): 409 on duplicate email (generic message to client)
// TODO(register): hash password (argon2id/bcrypt), create user, return 201
// TODO(register): optional — send verification email (deferred until email sender exists)
// TODO(register): fix OpenAPI metadata — tags: ["Auth"], summary "Register"
// Register
authRoute.openapi(
  createRoute({
    method: "post",
    path: "/register",
    tags: ["Auth"],
    request: {
      body: {
        description: "",
        content: { "application/json": { schema: AuthRegisterSchema } },
      },
    },
    responses: {
      201: {
        description: "Private Data User",
        content: { "application/json": { schema: PrivateUserSchema } },
      },
      400: {
        description: "Register user failed",
      },
    },
  }),
  async (c) => {
    return c.json({ status: "ok" });
  },
);

// TODO(refresh): POST /refresh — rotate refresh token, issue new pair; 401 on revoked/reused token
// TODO(logout): POST /logout — revoke current refresh token
// TODO(me): GET /me — auth guard middleware; return user id/email; first smoke test of the guard
// TODO(forgot-password): POST /forgot-password — always 200 (no user enumeration); email reset link
// TODO(forgot-password): depends on email sender — ship without this + reset if not ready at launch
// TODO(reset-password): POST /reset-password — token + new password; revoke all refresh tokens
