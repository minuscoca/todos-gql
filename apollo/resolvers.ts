import db from '../db/db';

export const resolvers = {
  Query: {
    todos: async () => {
      const todos = await db.query.todos.findMany();
      return todos;
    },
  },
};
