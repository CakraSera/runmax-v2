# Login already hashes; the gap is the floor filter

The login path already calls `argon2.verify` and signs an HS256 JWT with `sub`, `iat`, and `exp`. The user asked to be judged against standards with a strong Lindy Effect, and asked for advice without application-code changes. They have not yet shown they can classify a control as floor fail, floor pass, or not the floor.

## Evidence

Stated in the review request on 2026-10-10, and visible in `apps/api/src/lib/auth.ts` and `apps/api/src/lib/token.ts`. Lesson 02 teaches the filter. Do not treat exposure to that lesson as mastery until they place the bins without the sheet.

## Implications

Do not re-teach what a hash or a JWT is. Next session starts from the six floor fails (logs, enumeration including timing, throttle, unused `AuthLoginSchema`, signing key, empty `verifyToken`). Length and breached-password checks belong on register, not inside login. MFA and OAuth stay off the floor unless the mission moves to AAL2.
