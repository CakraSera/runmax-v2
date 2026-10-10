import { decode, sign, verify } from "hono/jwt";

const nowInSeconds = () => Math.floor(Date.now() / 1000);

type signTokenProps = {
  userId: string;
  secretKey: string;
};
export async function signToken({ userId, secretKey }: signTokenProps) {
  const payload = {
    sub: userId,
    iat: nowInSeconds(),
    exp: nowInSeconds() + 60 * 15, // Token expires in 1 hour
  };

  // 4. Sign token using Hono's lightweight crypto wrapper (Defaults to HS256)
  const token = await sign(payload, secretKey, "HS256");
  return token;
}

export function verifyToken(token: string, secret: string) {
  return verify(token, secret, "HS256");
}
