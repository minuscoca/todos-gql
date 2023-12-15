import { gql } from '@apollo/client';

export const typeDefs = gql`
  type Query {
    todos: [Todo]
  }

  type Mutation {
    addTodo(title: String!): Todo!
    completeTodo(id: Int!, isCompleted: Boolean!): Todo!
  }

  type Todo {
    id: Int!
    title: String!
    isCompleted: Boolean!
  }
`;
