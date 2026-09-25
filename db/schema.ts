import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const targets = sqliteTable("targets", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  city: text("city").notNull(),
  website: text("website").notNull().default(""),
  contactRole: text("contact_role").notNull().default(""),
  contactChannel: text("contact_channel").notNull().default(""),
  valueProp: text("value_prop").notNull().default(""),
  nextAction: text("next_action").notNull().default(""),
  nextActionDate: text("next_action_date").notNull().default("Chưa đặt"),
  stage: text("stage").notNull().default("Research"),
  fit: integer("fit").notNull().default(15),
  access: integer("access").notNull().default(15),
  trust: integer("trust").notNull().default(15),
  readiness: integer("readiness").notNull().default(15),
  score: integer("score").notNull().default(60),
  learners: integer("learners").notNull().default(0),
  notes: text("notes").notNull().default(""),
  updatedAt: text("updated_at").notNull(),
});

export const activities = sqliteTable("activities", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  targetId: text("target_id").notNull(),
  kind: text("kind").notNull(),
  detail: text("detail").notNull().default(""),
  occurredAt: text("occurred_at").notNull(),
});
