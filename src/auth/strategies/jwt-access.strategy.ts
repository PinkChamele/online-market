import { ExtractJwt, Strategy } from 'passport-jwt';

import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IAccessPayload } from '../interfaces/access-payload.interface';

@Injectable()
export default class JwtAccessStrategy extends PassportStrategy(Strategy, 'accessToken') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.secret'),
    });
  }

  async validate(payload: IAccessPayload): Promise<IAccessPayload> {
    return payload;
  }
}
