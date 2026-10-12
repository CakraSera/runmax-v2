import { eq } from "drizzle-orm";

import { db } from "../../lib/db/index.ts";
import { users } from "../../lib/db/schema.js";

export async function getUserById(userId: string) {
  const getUserById = await db
    .select({
      id: users.id,
      userName: users.username,
      email: users.email,
    })
    .from(users)
    .where(eq(users.id, userId));
  return getUserById[0];
}
