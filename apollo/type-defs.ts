import { gql } from '@apollo/client';

export const typeDefs = gql`
  type Query {
    todos: [Todo]
  }

  type Mutation {
    addTodo(title: String!): AddTodoResponse!
  }

  type AddTodoResponse {
    todo: Todo
  }

  type Todo {
    id: Int!
    title: String!
    isCompleted: Boolean!
  }
`;
