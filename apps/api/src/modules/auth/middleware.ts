import { createMiddleware } from "hono/factory";
import { verifyToken } from "../../lib/token.ts";
import { getUserById } from "./service.ts";

function unauthorized(c: {
  text: (
    body: string,
    status: 401,
    headers: { "WWW-Authenticate": string },
  ) => void;
}) {
  return c.text("Unauthorized", 401, { "WWW-Authenticate": "Bearer" });
}

export const authMiddleware = createMiddleware(async (c, next) => {
  const token = c.req.header("Authorization")?.split(" ")[1];
  if (!token) return unauthorized(c);

  const secretKey = process.env.JWT_SECRET_KEY;
  if (!secretKey || secretKey.length < 32) {
    return c.json(
      {
        status: "error",
        message:
          "Server configuration error: JWT secret key is missing or too short",
      },
      500,
    );
  }

  try {
    const { sub } = await verifyToken(token ?? "", secretKey);
    if (!sub) return c.text("Unauthorized", 401);
    const user = getUserById(sub);
    if (!user) return c.text("Unauthorized", 401);
    c.set("user", user);
  } catch (error) {
    return c.text("Unauthorize", 401);
  }
  await next();
});
