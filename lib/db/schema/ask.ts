import { pgTable, text, timestamp } from "drizzle-orm/pg-core"

import { user } from "./auth"

export const ask = pgTable("ask", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => user.id, { onDelete: "set null" }),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const askComment = pgTable("ask_comment", {
  id: text("id").primaryKey(),
  askId: text("ask_id")
    .notNull()
    .references(() => ask.id, { onDelete: "cascade" }),
  userId: text("user_id").references(() => user.id, { onDelete: "set null" }),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})
