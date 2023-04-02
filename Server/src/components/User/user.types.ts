import { Document } from 'mongoose';
import { Todo } from '../Todo/todo.types';

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  todos: Todo[];
}

export const UserType = `#graphql
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    todos: [Todo]
  }
`;

export const UserInputs = `#graphql
  input GetUsersFilters {
    limit: Int
    skip: Int
  }
  input UserData {
    username: String!
    email: String!
    password: String!
  }
  input UpdateUserInput {
    username: String
    email: String
  }
`;

export const UserQueries = `#graphql
  users(filters: GetUsersFilters): [User]
  user(id: ID!): User
  currentUser: User
`;

export const UserMutations = `#graphql
  addUser(data: UserData): User
  updateUserData(id: ID, data: UpdateUserInput): User
`;