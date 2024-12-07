import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

export const GetUser = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;

        if( !user ) {
            throw new InternalServerErrorException('User not found');
        }
        if( data ) {
            if( user[data] ) {
                return user[data];
            }
            throw new InternalServerErrorException('Property not found');
        }





        return user;

    },
);