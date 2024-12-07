import { User } from "./user.interface";

export interface CheckAuthStatusResponse {
    user:  User;
    token: string;
}

