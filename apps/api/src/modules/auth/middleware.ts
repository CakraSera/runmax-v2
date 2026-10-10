import argon2 from "argon2";

export async function hashPassword(password: string) {
  const hashedPasword = await argon2.hash(password);
  console.log({ hashedPasword });
  return hashedPasword;
}
