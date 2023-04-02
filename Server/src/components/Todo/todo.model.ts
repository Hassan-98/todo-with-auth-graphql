import mongoose from 'mongoose';
import validator from 'validator';
import { Todo } from './todo.types';
import { HttpError } from '../../middlewares/error.handler.middleware';
import errorMessages from '../../utils/error-messages';

const UserSchema = new mongoose.Schema({
  content: {
    type: String,
    trim: true,
    validate(value: string) {
      if (validator.isEmpty(value)) throw HttpError(400, errorMessages.EMPTY('content'))
    }
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });


const Model = mongoose.model<Todo>("Todo", UserSchema);

export type TodoModel = typeof Model;

export default Model;
