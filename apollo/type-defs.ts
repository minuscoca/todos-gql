import { gql } from '@apollo/client';

export const typeDefs = gql`
  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
  }

  type Query {
    todos: [Todo]
  }
`;

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};
