//= Utils
import filtersParser from '../../utils/filtersParser';
//= Handler
import ResolverHandler from '../../graphql/resolver.handler';
//= Middlewares
import { shouldBeAuthenticated } from '../Auth/auth.middleware';
//= Types
import { Context } from '../../types';
import { Todo } from './todo.types';

/**
 * TODO: add validation for CRUD operations (maybe a validation middleware)
 */


export const TodoQueryResolvers = {
  /***********************
   * Get TODOs Resolver
   */
  todos: ResolverHandler<{ items: Todo[], count: number }>(async ({ query: filterQuery }: GetTodosParams, { req, TODO }: Context) => {
    const parsedQuery = filtersParser(filterQuery);
    const filter = { author: req.user._id, ...(parsedQuery.filters ? { ...parsedQuery.filters } : {}) };

    const todos = await TODO.find(filter, null, parsedQuery.options).populate('author');
    const count = await TODO.count(filter);
    return { items: todos, count }
  }, [shouldBeAuthenticated]),
  /***********************
   * Get TODO by id Resolver
   */
  todo: ResolverHandler<Todo>(async ({ id }: GetTodoParams, { req, TODO }: Context) => {
    const todo = await TODO.findOne({ _id: id, author: req.user._id }).populate('author');
    if (!todo) throw new Error(`Todo not found`);
    return todo
  }, [shouldBeAuthenticated])
}

export const TodoMutationResolvers = {
  /***********************
   * Aad TODO Resolver
   */
  addTodo: ResolverHandler<Todo>(async ({ data }: AddTodoParams, { TODO, USER }: Context) => {
    const todo = await TODO.create({
      content: data.content,
      author: data.user
    });
    await USER.findByIdAndUpdate(data.user, {
      $push: {
        todos: todo._id
      }
    });
    const populatedTodod = await TODO.findById(todo._id).populate('author');
    if (!populatedTodod) throw new Error(`Todo not found`);
    return populatedTodod;
  }, [shouldBeAuthenticated]),
  /**************************
   * Update TODO Resolver
   */
  updateTodo: ResolverHandler<Todo>(async ({ id, data }: UpdateTodoParams, { TODO }: Context) => {
    const todo: Todo | null = await TODO.findByIdAndUpdate(id, data, { new: true }).populate('author');
    if (!todo) throw new Error(`Todo not found`);
    return todo;
  }, [shouldBeAuthenticated]),
  /**************************
   * Remove TODO Resolver
   */
  removeTodo: ResolverHandler<Todo>(async ({ id }: RemoveTodoParams, { TODO, USER }: Context) => {
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
  query: {
    limit?: number;
    skip?: number;
    filter: string;
    sort: string;
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