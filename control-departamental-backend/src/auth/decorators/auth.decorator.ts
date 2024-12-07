import { applyDecorators, UseGuards } from "@nestjs/common";
import { VALID_ROLES } from "../interfaces";
import { RoleProtected } from "./role-protected.decorator";
import { UserRoleGuard } from "../guards/user-role.guard";
import { AuthGuard } from "@nestjs/passport";


export function Auth(...roles: VALID_ROLES[]) {
    return applyDecorators(
        RoleProtected(...roles),
        UseGuards(AuthGuard(), UserRoleGuard)
    )
}