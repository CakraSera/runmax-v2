import argon2 from "argon2";

const dummyPassword = "password";
export async function hashingPassword(password: string) {
  const hashedPasword = await argon2.hash(password);
  console.log({ hashedPasword });
  return hashedPasword;
}

export async function verifyPassword(password: string, hashedPassword: string) {
  const isValid = await argon2.verify(hashedPassword, password);
  return isValid;
}

export async function dummyHashPassword() {
  const hashedPasword = await argon2.hash(dummyPassword);
  return hashedPasword;
}
