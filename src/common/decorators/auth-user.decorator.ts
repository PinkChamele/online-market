import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const AuthUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const { user } = ctx.switchToHttp().getRequest();

  return { ...user, _id: user._id instanceof Types.ObjectId ? user._id : ObjectId.createFromHexString(user._id) };
});

export default AuthUser;
