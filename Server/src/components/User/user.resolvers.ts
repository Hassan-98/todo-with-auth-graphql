import { Request } from 'express';
import CryptoJS from 'crypto-js';
import path from 'path';
import { createWriteStream } from 'fs';
import { finished } from 'stream/promises';
//= Models
import USER from './user.model';
//= Config
import ConfigVars from '../../configs/app.config';
//= Handler
import ResolverHandler from '../../graphql/resolver.handler';
//= Middlewares
import { shouldBeAuthenticated } from '../Auth/auth.middleware';
//= Validators
import { UpdatePasswordSchema } from './user.validation';
//= Types
import { User } from './user.types';

const Config = ConfigVars();
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
    let user: User | null = await USER.findById(id);
    if (!user) throw new Error('User not found');

    let updates: UserUpdates = {};

    if (data.currentPassword) {
      const validation_check = UpdatePasswordSchema.safeParse(data);
      if (!validation_check.success) throw new Error(validation_check.error.issues.map((issue: any) => `- ${issue.path.join('.')} ${issue.message}`).join(' \n '));

      const decryptedPassword = CryptoJS.AES.decrypt(user.password, Config.CRYPTO_SECRET).toString(CryptoJS.enc.Utf8);
      if (data.currentPassword !== decryptedPassword) throw new Error(`Password is incorrent`);

      let newPassword = CryptoJS.AES.encrypt(data.newPassword as string, Config.CRYPTO_SECRET).toString();
      updates.password = newPassword;
    }
    if (data.email) updates.email = data.email;
    if (data.username) updates.username = data.username;
    if (data.picture) {
      const { filename, createReadStream } = await data.picture;
      const stream = createReadStream();
      const filePath = path.join(__dirname, '../../../../Client/public/', filename);
      const output = createWriteStream(filePath);
      stream.pipe(output);
      await finished(output);
      updates.picture = `/${filename}`;
    }

    user = await USER.findByIdAndUpdate(id, updates, { new: true }).populate('todos').lean();
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
    picture?: any;
    currentPassword?: string;
    newPassword?: string;
  }
}

type UserUpdates = {
  username?: string;
  email?: string;
  picture?: string;
  password?: string;
}