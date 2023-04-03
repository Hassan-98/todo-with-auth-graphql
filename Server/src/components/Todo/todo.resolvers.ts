//= Models
import TODO from './todo.model';
import USER from '../User/user.model';
//= Types
import { Todo } from './todo.types';
import { ExtendedRequest } from '../../types/request.type';
//= Handler
import ResolverHandler from '../../graphql/resolver.handler';
//= Middlewares
import { shouldBeAuthenticated } from '../Auth/auth.middleware';


export const TodoQueryResolvers = {
  /***********************
   * Get TODOs Resolver
   */
  todos: ResolverHandler(async ({ filters }: GetTodosParams, req: ExtendedRequest) => {
    const query = {
      author: req.user._id,
      ...(filters?.search ? { content: { $regex: filters.search, $options: 'i' } } : {})
    }
    const options = {
      ...(filters?.limit ? { limit: filters.limit } : {}),
      ...(filters?.skip ? { skip: filters.skip } : {}),
      sort: { createdAt: -1 }
    }
    const todos = await TODO.find(query, null, options).populate('author');
    const count = await TODO.count(query);
    return { data: todos, count }
  }, [shouldBeAuthenticated]),
  /***********************
   * Get TODO by id Resolver
   */
  todo: ResolverHandler(async ({ id }: GetTodoParams, req: ExtendedRequest) => {
    const todo = await TODO.findOne({ _id: id, author: req.user._id }).populate('author');
    if (!todo) throw new Error(`Todo not found`);
    return todo
  }, [shouldBeAuthenticated])
}

export const TodoMutationResolvers = {
  /***********************
   * Aad TODO Resolver
   */
  addTodo: ResolverHandler(async ({ data }: AddTodoParams) => {
    const todo = await TODO.create({
      content: data.content,
      author: data.user
    });
    await USER.findByIdAndUpdate(data.user, {
      $push: {
        todos: todo._id
      }
    });
    return await TODO.findById(todo._id).populate('author');
  }, [shouldBeAuthenticated]),
  /**************************
   * Update TODO Resolver
   */
  updateTodo: ResolverHandler(async ({ id, data }: UpdateTodoParams) => {
    const todo: Todo | null = await TODO.findByIdAndUpdate(id, data, { new: true }).populate('author');
    if (!todo) throw new Error(`Todo not found`);
    return todo;
  }, [shouldBeAuthenticated]),
  /**************************
   * Remove TODO Resolver
   */
  removeTodo: ResolverHandler(async ({ id }: RemoveTodoParams) => {
    const todo: Todo | null = await TODO.findByIdAndDelete(id);
    if (!todo) throw new Error(`Todo not found`);
    await USER.findByIdAndUpdate(todo.author, {
      $pull: {
        todos: id
      }
    });
    return todo;
  }, [shouldBeAuthenticated])
}



/**
 * Types of parameters
*/
type GetTodosParams = {
  filters: {
    search?: string;
    limit?: number;
    skip?: number;
  }
}

type GetTodoParams = {
  id: string;
}

type AddTodoParams = {
  data: {
    content: string;
    user: string;
  };
}

type UpdateTodoParams = {
  id: string;
  data: {
    isCompleted?: boolean;
    content?: string;
  };
}

type RemoveTodoParams = {
  id: string;
}