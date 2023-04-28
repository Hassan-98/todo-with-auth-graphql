import { Request, Response, NextFunction } from 'express';
//= Modules
import jwt from 'jsonwebtoken';
//= Models
import USER from '../User/user.model';
//= Config
import ConfigVars from '../../configs/app.config';
//= Error Messages
import errorMessages from '../../utils/error-messages';
//= Types
import { User } from '../User/user.types';

const Config = ConfigVars();

export type TokenPayload = {
  user: string
}

interface ExtendedRequest extends Request {
  user: User
}

export const Authenticated = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  try {
    const JWT_Token = req.signedCookies['todo-login-session'];

    if (!JWT_Token) return res.status(403).json({ success: false, data: null, message: errorMessages.AUTH_REQUIRED });

    const { user: userId } = jwt.verify(JWT_Token, Config.JWT_SECRET) as TokenPayload;

    if (!userId) return res.status(403).json({ success: false, data: null, message: errorMessages.AUTH_REQUIRED });

    const user: User = await USER.findById(userId).select({ username: 1, email: 1 }).lean();

    req.user = user;

    next();
  } catch (err: any) {
    res.status(500).json({ success: false, data: null, message: err.message });
  }
}

export const NotAuthenticated = (req: ExtendedRequest, res: Response, next: NextFunction) => {
  try {
    const JWT_Token = req.signedCookies['todo-login-session'];

    if (!JWT_Token) return next();

    jwt.verify(JWT_Token, Config.JWT_SECRET);

    return res.status(400).json({ success: false, data: null, message: errorMessages.ALREADY_AUTHENTICATED });
  } catch {
    next();
  }
}

export const shouldBeAuthenticated = async ({ req }: { req: ExtendedRequest }) => {
  const JWT_Token = req.signedCookies['todo-login-session'];
  if (!JWT_Token) throw new Error(errorMessages.AUTH_REQUIRED);

  const { user: userId } = jwt.verify(JWT_Token, Config.JWT_SECRET) as TokenPayload;
  if (!userId) throw new Error(errorMessages.AUTH_REQUIRED);

  const user: User = await USER.findById(userId).select({ username: 1, email: 1 }).lean();
  req.user = user;
}