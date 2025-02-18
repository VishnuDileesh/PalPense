import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

export const users = sqliteTable("users", {
    id: text("id").primaryKey(),
    userName: text("userName").notNull(),
    createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

export const penses = sqliteTable("penses", {
    id: text("id").primaryKey(),
    createdBy: text("createdBy").references(() => users.id),
    storeId: text("storeId").references(() => stores.id),
    totalAmount: real("totalAmount").notNull(),
    paidBy: text("paidBy").references(() => users.id),
    createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

export const stores = sqliteTable("stores", {
    id: text("id").primaryKey(),
    storeName: text("storeName").notNull(),
    createdBy: text("createdBy").references(() => users.id),
    createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

export const items = sqliteTable("items", {
    id: text("id").primaryKey(),
    itemName: text("itemName").notNull(),
    itemPrice: real("itemPrice").notNull(),
    storeId: text("storeId").references(() => stores.id),
    createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

export const orders = sqliteTable("orders", {
    id: text("id").primaryKey(),
    itemId: text("itemId").references(() => items.id),
    quantity: integer("quantity").notNull(),
    userId: text("userId").references(() => users.id),
    penseId: text("penseId").references(() => penses.id),
    createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});
  

export const settlements = sqliteTable("settlements", {
    id: text("id").primaryKey(),
    penseId: text("penseId").references(() => penses.id),
    palId: text("palId").references(() => users.id),
    amountOwed: real("amountOwed").notNull(),
    paymentStatus: text("paymentStatus", {
      enum: ["pending", "completed"],
    }).notNull(),
});
  

