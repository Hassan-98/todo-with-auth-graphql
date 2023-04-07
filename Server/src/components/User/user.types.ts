import { Document } from 'mongoose';
import { Todo } from '../Todo/todo.types';

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  picture: string;
  todos: Todo[];
}
