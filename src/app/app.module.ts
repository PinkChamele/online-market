import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Logger, Module } from '@nestjs/common';
import AuthModule from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

import OrdersModule from 'src/orders/orders.module';
import ProductsModule from 'src/products/products.module';
import UsersModule from 'src/users/users.module';
import configuration from 'src/common/configuration';
import CategoriesModule from 'src/categories/categories.module';
import AppController from './app.controller';
import AppService from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('mongodb.uri'),
      }),
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        config: {
          username: configService.get('redis.user'),
          password: configService.get('redis.password'),
          host: configService.get('redis.host'),
          port: configService.get('redis.port'),
          onClientCreated: async (client): Promise<void> => {
            client.on('error', Logger.error);
            client.on('ready', () => {
              Logger.log('redis is running on 6379 port');
            });
            client.on('restart', () => {
              Logger.log('attempt to restart the redis server');
            });
          },
          reconnectOnError: (): boolean => true,
        },
      }),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
      }),
    }),
    OrdersModule,
    CategoriesModule,
    UsersModule,
    ProductsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}
