//= Modules
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
//= Decorators
import { Controller, Post, Patch, Use } from '../../decorators';
//= Service
import AuthService from './auth.service';
//= Middlewares
import { bodyValidator } from '../../middlewares/validation.middleware';
import { Authenticated, NotAuthenticated } from './auth.middleware';
import { HttpError } from '../../middlewares/error.handler.middleware';
//= Validators
import { UserSchema, LoginSchema } from '../User/user.validation';
//= Config
import ConfigVars from '../../configs/app.config';

const Config = ConfigVars();
const Service = new AuthService();

@Controller('/auth')
class AuthController {
  @Post('/login')
  @Use(NotAuthenticated)
  @Use(bodyValidator(LoginSchema))
  public async login(req: Request, res: Response) {
    const { email, password, rememberMe } = req.body;

    let { token, userId } = await Service.login({ email, password, rememberMe });

    const userData = await Service.findUserById(userId);

    res.cookie('todo-login-session', token, {
      secure: Config.isProduction,
      httpOnly: true,
      signed: true,
      expires: new Date(new Date().getTime() + (rememberMe ? 365 : 1) * 24 * 60 * 60 * 1000)
    }).status(200).json({ success: true, data: userData });
  };


  @Post('/signup')
  @Use(NotAuthenticated)
  @Use(bodyValidator(UserSchema))
  public async createNewAccount(req: Request, res: Response) {
    const { username, email, password, rememberMe } = req.body;
    let { token, userId } = await Service.create({ username, email, password, rememberMe });

    const userData = await Service.findUserById(userId);

    res.cookie("todo-login-session", token, {
      secure: Config.isProduction,
      httpOnly: true,
      signed: true,
      expires: new Date(new Date().getTime() + (rememberMe ? 365 : 1) * 24 * 60 * 60 * 1000)
    })
      .status(201)
      .json({ success: true, data: userData });
  }


  @Post('/logout')
  @Use(Authenticated)
  public logout(req: Request, res: Response) {
    res.clearCookie('todo-login-session');
    res.status(200).json({ success: true, data: null });
  };
}

export default AuthController;

