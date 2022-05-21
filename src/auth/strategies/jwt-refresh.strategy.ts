import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import UsersService from 'src/users/users.service';
import { User } from 'src/users/schemas/users.schema';
import { IRefreshPayload } from '../interfaces/refresh-payload.interface';
import AuthService from '../auth.service';

@Injectable()
export default class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refreshToken') {
  constructor(configService: ConfigService, private authService: AuthService, private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.secret'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: IRefreshPayload): Promise<User> {
    const oldRefreshToken = await this.authService.getRefreshToken(payload._id);
    const rawRefreshToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);

    if (oldRefreshToken !== rawRefreshToken) {
      throw new UnauthorizedException('Authentication credentials were missing or incorrect');
    }

    return this.userService.getOneOrError({ _id: payload._id });
  }
}
