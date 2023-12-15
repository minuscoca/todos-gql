import { eq } from 'drizzle-orm';
import db from '../db/db';
import { todos, type NewTodo, type Todo } from '../db/schema/todos';

export const resolvers = {
  Query: {
    todos: async () => {
      const data = (await db
        .select()
        .from(todos)
        .orderBy(todos.createdAt)) as Todo[];
      console.log('todos', data);
      return data;
    },
  },

  Mutation: {
    addTodo: async (_, args: Pick<NewTodo, 'title'>) => {
      const newTodos = await db
        .insert(todos)
        .values({ title: args.title })
        .returning();
      console.log('newTodos', newTodos);
      return newTodos[0];
    },
    completeTodo: async (_, args: Pick<Todo, 'id' | 'isCompleted'>) => {
      const updatedTodos = await db
        .update(todos)
        .set({ isCompleted: args.isCompleted })
        .where(eq(todos.id, args.id))
        .returning();
      console.log('updatedTodos', updatedTodos);
      return updatedTodos[0];
    },
  },
};
