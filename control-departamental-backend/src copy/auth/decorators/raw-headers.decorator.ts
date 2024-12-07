import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

export const GetRawHeaders = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const headers = request.rawHeaders;
        if (data) {
            const header = headers.find((header) => header === data);
            if (!header) {
                throw new InternalServerErrorException(`Header ${data} not found`);
            }
            return header;
        }

        return headers;

    },
);