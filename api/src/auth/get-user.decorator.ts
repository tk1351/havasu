import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../users/models/users.entity';

export const GetCurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
