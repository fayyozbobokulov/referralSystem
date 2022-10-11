import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../user/entities/user.entity';
import { IExpressRequest } from '../interfaces/expressRequest.interface';

export const GetUser = createParamDecorator(
  (data: any, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest<IExpressRequest>();
    if (!request.user) return null;
    if (data) return request.user[data];
    return request.user;
  },
);
