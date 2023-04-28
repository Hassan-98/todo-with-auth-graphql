//= Models
import USER from '../components/User/user.model';
import TODO from '../components/Todo/todo.model';
//= Types
import { ExtendedRequest } from './request.type';

export interface Context {
  req: ExtendedRequest;
  USER: typeof USER;
  TODO: typeof TODO;
}