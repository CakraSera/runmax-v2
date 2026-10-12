import { sign, verify } from "hono/jwt";

const nowInSeconds = () => Math.floor(Date.now() / 1000);

type SignTokenInput = {
  userId: string;
  secretKey: string;
};
export async function signToken({
  userId,
  secretKey,
}: SignTokenInput): Promise<string> {
  const payload = {
    sub: userId,
    iat: nowInSeconds(),
    exp: nowInSeconds() + 60 * 15, // Token expires in 15 minutes
  };

  // 4. Sign token using Hono's lightweight crypto wrapper (Defaults to HS256)
  const token = await sign(payload, secretKey, "HS256");
  return token;
}

export function verifyToken(token: string, secretKey: string) {
  return verify(token, secretKey, "HS256");
}
