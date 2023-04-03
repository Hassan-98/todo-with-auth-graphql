import { Document } from 'mongoose';
//= Types
import { User } from '../User/user.types';

export interface Todo extends Document {
  content: string;
  isCompleted: boolean;
  author: User;
}
