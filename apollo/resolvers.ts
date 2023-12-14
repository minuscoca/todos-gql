import db from '../db/db';
import { todos, type NewTodo } from '../db/schema/todos';

export const resolvers = {
  Query: {
    todos: async () => {
      const todos = await db.query.todos.findMany();
      console.log('todos', todos);
      return todos;
    },
  },

  Mutation: {
    addTodo: async (_, args: NewTodo) => {
      const newTodo = await db
        .insert(todos)
        .values({ title: args.title })
        .returning();
      console.log('newTodo', newTodo);
      return {
        todo: newTodo,
      };
    },
  },
};
