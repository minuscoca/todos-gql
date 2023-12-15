import { eq } from 'drizzle-orm';
import db from '../db/db';
import { todos, type Todo } from '../db/schema/todos';
import { GraphQLScalarType, Kind } from 'graphql';

export const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value: Date) {
      return new Date(value); // value from the client
    },
    serialize(value: Date) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(parseInt(ast.value, 10)); // ast value is always in string format
      }
      return null;
    },
  }),

  Query: {
    todos: async () => {
      const data = (await db
        .select()
        .from(todos)
        .orderBy(todos.createdAt)) as Todo[];
      // console.log('todos', data);
      return data;
    },
  },

  Mutation: {
    addTodo: async (_, args: Pick<Todo, 'title'>) => {
      const newTodos = await db
        .insert(todos)
        .values({ title: args.title })
        .returning();
      console.log('newTodos', newTodos);
      return newTodos[0];
    },
    completeTodo: async (
      _,
      args: Pick<Todo, 'id' | 'isCompleted' | 'updatedAt'>
    ) => {
      const updatedTodos = await db
        .update(todos)
        .set({ isCompleted: args.isCompleted, updatedAt: new Date() })
        .where(eq(todos.id, args.id))
        .returning();
      console.log('updatedTodos', updatedTodos);
      return updatedTodos[0];
    },
    editTodo: async (_, args: Pick<Todo, 'id' | 'title'>) => {
      const updatedTodos = await db
        .update(todos)
        .set({ title: args.title, updatedAt: new Date() })
        .where(eq(todos.id, args.id))
        .returning();
      console.log('updatedTodos', updatedTodos);
      return updatedTodos[0];
    },
    deleteTodo: async (_, args: Pick<Todo, 'id'>) => {
      const deletedTodos = await db
        .delete(todos)
        .where(eq(todos.id, args.id))
        .returning();
      console.log('deletedTodos', deletedTodos);
      return deletedTodos[0];
    },
  },
};
