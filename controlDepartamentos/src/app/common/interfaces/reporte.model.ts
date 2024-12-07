export interface ReporteResponse {
    id:                string;
    descripcion:       string;
    fecha_inicio:      Date;
    fecha_fin:         null | Date;
    estado:            string;
    user:              User;
    servicio_asignado: ServicioAsignado | null;
}

export interface ServicioAsignado {
    id:        string;
    estado:    string;
    encargado: string;
    servicio:  Servicio;
}

export interface User {
    id:             string;
    nombre:         string;
    apellido:       string;
    email:          string;
    password:       string;
    telefono:       string;
    rol:            string;
    fecha_creacion: Date;
    isActive:       boolean;
}


export interface ReportePost {
    descripcion:  string;
}


export interface Servicio {
    id:          string;
    nombre:      string;
    descripcion: string;
    estado:      string;
}
