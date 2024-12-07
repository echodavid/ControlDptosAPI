import { UserResponse } from ".";

export interface NotificationResponse {
    id:             string;
    tipo:           string;
    titulo:         string;
    descripcion:    string;
    fecha_creacion: Date;
    readed:         boolean;
    user:           UserResponse;
}