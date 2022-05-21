import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import UsersController from './users.controller';
import UsersService from './users.service';
import UsersRepository from './users.repository';
import { User, UserSchema } from './schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema,
    }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export default class UsersModule {}
