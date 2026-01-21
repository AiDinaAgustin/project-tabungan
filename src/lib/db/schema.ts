import { pgTable, text, timestamp, integer, boolean, decimal } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: text("id").primaryKey(), // We'll use id from auth or random
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(), // Remember to hash this
    partnerId: text("partner_id"), // Self-reference link
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const targets = pgTable("targets", {
    id: text("id").primaryKey(),
    userId: text("user_id").references(() => users.id).notNull(),
    title: text("title").notNull(),
    targetAmount: decimal("target_amount", { precision: 20, scale: 2 }).notNull(),
    icon: text("icon").notNull().default("savings"),
    iconBg: text("icon_bg").notNull().default("bg-[#e0f2f1]"),
    iconColor: text("icon_color").notNull().default("text-[#7ca29d]"),
    progressColor: text("progress_color").notNull().default("bg-[#7ca29d]"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const savings = pgTable("savings", {
    id: text("id").primaryKey(),
    targetId: text("target_id").references(() => targets.id).notNull(),
    userId: text("user_id").references(() => users.id).notNull(),
    amount: decimal("amount", { precision: 20, scale: 2 }).notNull(),
    source: text("source").notNull(), // e.g., "Tabungan Mingguan"
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
