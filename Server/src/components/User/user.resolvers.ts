import { Request } from 'express';
//= Models
import USER from './user.model';
//= Types
import { User } from './user.types';
//= Handler
import ResolverHandler from '../../graphql/resolver.handler';
//= Middlewares
import { shouldBeAuthenticated } from '../Auth/auth.middleware';

// function checkAuth(req: Request) {
//   if (req.cookies.marketyLang !== 'en') {
//     throw new Error('You must be logged in')
//   }
// }

interface ExtendedRequest extends Request {
  user: User
}

export const UserQueryResolvers = {
  /***********************
   * Get USERs Resolver
   */
  users: ResolverHandler(async ({ filters }: UsersParams) => {
    return await USER.find({}, { ...(filters.limit ? { limit: filters.limit } : {}), ...(filters.skip ? { skip: filters.skip } : {}) }).populate('todos').lean();
  }),
  /***********************
   * Get USER by id Resolver
   */
  user: ResolverHandler(async ({ id }: UserParams) => {
    const user = await USER.findById(id).populate('todos').lean();
    return user;
  }),
  /***********************
   * Get USER by id Resolver
   */
  currentUser: ResolverHandler(async (_: any, req: ExtendedRequest) => {
    const user = await USER.findById(req.user._id).populate('todos').lean();
    return user;
  }, [shouldBeAuthenticated]),
}

export const UserMutationResolvers = {
  /***********************
   * Add USER Resolver
   */
  addUser: ResolverHandler(async ({ data }: AddUserParams) => {
    return await USER.create(data);
  }),
  /**************************
   * Update TODO Resolver
   */
  updateUserData: ResolverHandler(async ({ id, data }: UpdateUserParams) => {
    const user: User | null = await USER.findByIdAndUpdate(id, data, { new: true }).populate('todos').lean();
    if (!user) throw new Error(`User not found`);
    return user;
  }),
}


//= Params Types
type UsersParams = {
  filters: {
    limit?: number;
    skip?: number;
  }
}

type UserParams = {
  id: string;
}

type AddUserParams = {
  data: {
    username: string;
    email: string;
    password: string;
  }
}

type UpdateUserParams = {
  id: string;
  data: {
    username?: string;
    email?: string;
  }
}