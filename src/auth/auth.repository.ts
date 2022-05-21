import * as Redis from 'ioredis';
import { Types } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';

import AUTH_CONSTANTS from './auth.constants';

@Injectable()
export default class AuthRepository {
  private readonly redisClient: Redis.Redis;

  constructor(
    private readonly redisService: RedisService,
  ) {
    this.redisClient = redisService.getClient();
  }

  public async addToken(key: string, token: string, expiration: string): Promise<string | null> {
    return this.redisClient.set(key, token, 'EX', expiration);
  }

  public async addRefreshToken(_id: Types.ObjectId, refreshToken: string): Promise<string | null> {
    return this.redisClient.set(
      AuthRepository.refreshToken(_id),
      refreshToken,
      'EX',
      AUTH_CONSTANTS.REDIS.EXPIRATION.REFRESH_TOKEN,
    );
  }

  public removeToken(key: string): Promise<number> {
    return this.redisClient.del(key);
  }

  public getToken(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }

  public static refreshToken(id: Types.ObjectId) {
    return `refresh-${id.toString()}`;
  }
}
