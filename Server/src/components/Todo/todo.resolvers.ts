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
  todos: ResolverHandler(async ({ filters }: any, req: ExtendedRequest) => {
    const todos = await TODO.find({ author: req.user._id, ...filters }).populate('author');
    return todos
  }, [shouldBeAuthenticated]),
  /***********************
   * Get TODO by id Resolver
   */
  todo: ResolverHandler(async ({ id }: { id: string }, req: ExtendedRequest) => {
    const todo = await TODO.findOne({ _id: id, author: req.user._id }).populate('author');
    if (!todo) throw new Error(`Todo not found`);
    return todo
  }, [shouldBeAuthenticated])
}

export const TodoMutationResolvers = {
  /***********************
   * Aad TODO Resolver
   */
  addTodo: ResolverHandler(async ({ data }: { data: { content: string; user: string; } }) => {
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
  updateTodo: ResolverHandler(async ({ id, data }: { id: string, data: { isCompleted?: boolean; content?: string } }) => {
    const todo: Todo | null = await TODO.findByIdAndUpdate(id, data, { new: true }).populate('author');
    if (!todo) throw new Error(`Todo not found`);
    return todo;
  }, [shouldBeAuthenticated]),
  /**************************
   * Remove TODO Resolver
   */
  removeTodo: ResolverHandler(async ({ id }: { id: string }) => {
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