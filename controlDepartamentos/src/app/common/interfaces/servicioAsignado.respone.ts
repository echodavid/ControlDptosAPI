export interface ServicioAsignado {
    id:           string;
    estado:       string;
    encargado:    string;
    pago?:         Pago;
    departamento: Departamento;
    servicio:     Servicio;
}

export interface Departamento {
    id:                 string;
    nombre:             string;
    descripcion:        string;
    estado:             boolean;
    fecha_creacion:     Date;
    valoracion:         number;
    fecha_construccion: Date;
    apreciacion:        number;
    habitaciones:       number;
    banos:              number;
    user?:               User;
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

export interface Pago {
    id:                string;
    periodicidad:      number;
    fecha_pago:        Date;
    fecha_pagar:       Date;
    fecha_vencimiento: Date;
    estado:            string;
    archivo:           Archivo;
}

export interface Archivo {
    id:             string;
    nombre:         string;
    fecha_creacion: Date;
    url:            string;
    tipo:           string;
}

export interface Servicio {
    id:          string;
    nombre:      string;
    descripcion: string;
    estado:      string;
}
