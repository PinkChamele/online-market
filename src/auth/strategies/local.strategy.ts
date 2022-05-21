import { Request as ExpressRequest } from 'express';
import { Strategy } from 'passport-local';
import { validate } from 'class-validator';
import * as bcryptjs from 'bcryptjs';

import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';

import UsersService from 'src/users/users.service';
import { User } from 'src/users/schemas/users.schema';
import SignInDto from '../dto/sign-in.dto';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  async validate(req: ExpressRequest, email: string, password: string): Promise<User> {
    const errors = await validate(new SignInDto(req.body));

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    const user = await this.usersService.getOneOrError({ email });
    const passwordCompared = await bcryptjs.compare(password, user.password);

    if (!passwordCompared) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
  }
}
