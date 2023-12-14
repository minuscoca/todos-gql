import { gql } from '@apollo/client';

export const typeDefs = gql`
  type Todo {
    id: ID!
    name: String!
    completed: Boolean!
  }

  type Query {
    todos: [Todo]
  }
`;

export type Todo = {
  id: string;
  name: string;
  completed: boolean;
};
