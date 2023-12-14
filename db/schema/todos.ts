import {
  boolean,
  pgTable,
  serial,
  varchar,
  timestamp,
} from 'drizzle-orm/pg-core';

export const todos = pgTable('todos', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }).notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  completed: boolean('completed').default(false),
});

export type Todo = typeof todos.$inferSelect; // return type when queried
export type NewTodo = typeof todos.$inferInsert; // insert type
