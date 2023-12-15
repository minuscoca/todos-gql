import { gql } from '@apollo/client';

export const typeDefs = gql`
  scalar Date

  type MyType {
    created: Date
  }

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
    createdAt: Date!
    updatedAt: Date!
  }
`;
