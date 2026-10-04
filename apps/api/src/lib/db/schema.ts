import { sql } from "drizzle-orm";
import { char, pgTable, timestamp, varchar, uuid } from "drizzle-orm/pg-core";

const id = () =>
  uuid("id")
    .primaryKey()
    .default(sql`uuidv7()`);
const createdAt = () =>
  timestamp("created_at", { withTimezone: true }).notNull().defaultNow();
const updatedAt = () =>
  timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date());

export const users = pgTable("users", {
  id: id(),
  username: varchar("username", { length: 32 }).notNull().unique(),
  email: varchar("email", { length: 254 }).notNull().unique(),
  fullName: varchar("full_name", { length: 80 }).notNull(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

export const passwords = pgTable("passwords", {
  id: id(),
  userId: char("user_id", { length: 26 })
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  hash: varchar("hash", { length: 128 }).notNull(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});
