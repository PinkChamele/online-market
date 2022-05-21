import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import UsersModule from 'src/users/users.module';
import AuthController from './auth.controller';
import AuthService from './auth.service';
import AuthRepository from './auth.repository';
import JwtAccessStrategy from './strategies/jwt-access.strategy';
import JwtRefreshStrategy from './strategies/jwt-refresh.strategy';
import LocalStrategy from './strategies/local.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
      }),
    }),
    PassportModule,
    UsersModule,
  ],
  providers: [
    AuthService,
    AuthRepository,
    LocalStrategy,
    JwtAccessStrategy,
    JwtRefreshStrategy,
  ],
  controllers: [AuthController],
})
export default class AuthModule {}
