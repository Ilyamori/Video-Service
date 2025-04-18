import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';

export const CurrentUser = createParamDecorator(
    (data: keyof UserEntity, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const userFromRequest = request.user;

        return data ? userFromRequest[data] : userFromRequest;
    }
);
