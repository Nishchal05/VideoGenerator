import { integer, pgTable, varchar, json } from "drizzle-orm/pg-core"; 

export const USER_TABLE = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  image: varchar(),
  email: varchar({ length: 255 }).notNull().unique(),
  credits: integer().default(10)
});

export const VIDEO_RAW_TABLE = pgTable("videodata", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  videoId: varchar().notNull(),
  videoData: json(),
  type: varchar(),
  createdBy: varchar().notNull().references(() => USER_TABLE.email),  
  status:varchar().default('pending'),
});
