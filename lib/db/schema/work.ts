import {
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core"

import { user } from "./auth"

export const work = pgTable("work", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => user.id, { onDelete: "set null" }),
  imageUrl: text("image_url").notNull(),
  imageWidth: integer("image_width").notNull(),
  imageHeight: integer("image_height").notNull(),
  prompt: text("prompt").notNull(),
  platform: text("platform"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const workTag = pgTable("work_tag", {
  id: text("id").primaryKey(),
  workId: text("work_id")
    .notNull()
    .references(() => work.id, { onDelete: "cascade" }),
  tag: text("tag").notNull(),
})

export const workLike = pgTable(
  "work_like",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    workId: text("work_id")
      .notNull()
      .references(() => work.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.workId] })]
)
