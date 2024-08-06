import {
  createParamDecorator,
  ExecutionContext,
  UnprocessableEntityException,
} from '@nestjs/common';

export const GetParamUserId = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const userId = parseInt(req.headers['user-id']);
    if (isNaN(userId)) {
      throw new UnprocessableEntityException('Header user-id not found');
    }
    return userId;
  },
);
