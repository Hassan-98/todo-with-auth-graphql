import { Document } from 'mongoose';
//= Types
import { User } from '../User/user.types';

export interface Todo extends Document {
  content: string;
  isCompleted: boolean;
  author: User;
}

export const TodoType = `#graphql
  type Todo {
    _id: ID!
    content: String!
    isCompleted: Boolean
    author: User
  }
`;

export const TodoInputs = `#graphql
  input TodoData {
    user: ID!
    content: String!
  }
  input UpdateTodoData {
    content: String
    isCompleted: Boolean
  }
`;

export const TodoQueries = `#graphql
  todos: [Todo]
  todo(id: ID): Todo
`;

export const TodoMutations = `#graphql
  addTodo(data: TodoData): Todo
  updateTodo(id: ID!, data: UpdateTodoData): Todo
  removeTodo(id: ID): Todo
`;