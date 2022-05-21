import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IAccessPayload } from 'src/auth/interfaces/access-payload.interface';
import { IRefreshPayload } from 'src/auth/interfaces/refresh-payload.interface';
import JwtTokensDto from 'src/auth/dto/responses/jwt-tokens.dto';
import { Types } from 'mongoose';
import AuthRepository from './auth.repository';
import AUTH_CONSTANTS from './auth.constants';

@Injectable()
export default class AuthService {
  constructor(
  private readonly jwtService: JwtService,
  private readonly authRepository: AuthRepository,
  ) {}

  signToken<T extends Object>(payload: T, expiresIn: string, secret?: string): string {
    return this.jwtService.sign(payload, { expiresIn, secret });
  }

  async getRefreshToken(_id: Types.ObjectId): Promise<string | null> {
    return this.authRepository.getToken(AuthRepository.refreshToken(_id));
  }

  async removeRefreshToken(_id: Types.ObjectId): Promise<number> {
    return this.authRepository.removeToken(AuthRepository.refreshToken(_id));
  }

  async verifyToken<T extends Object>(token: string, secret: string): Promise<T | null> {
    try {
      return (await this.jwtService.verifyAsync<T>(token, { secret }));
    } catch (error) {
      return null;
    }
  }

  async signAccessRefresh(payload: IAccessPayload): Promise<JwtTokensDto> {
    const { REFRESH_TOKEN, ACCESS_TOKEN } = AUTH_CONSTANTS.JWT.EXPIRATION;
    const refreshToken = this.signToken<IRefreshPayload>({ _id: payload._id }, REFRESH_TOKEN);

    await this.authRepository.addRefreshToken(payload._id, refreshToken);

    return {
      accessToken: this.signToken<IAccessPayload>(payload, ACCESS_TOKEN),
      refreshToken,
    };
  }
}
