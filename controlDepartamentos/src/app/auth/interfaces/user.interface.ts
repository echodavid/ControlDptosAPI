export interface User {
    id:             string;
    nombre:         string;
    apellido:       string;
    email:          string;
    telefono:       string | null;
    rol:            string;
    fecha_creacion: Date;
    isActive:       boolean;
}