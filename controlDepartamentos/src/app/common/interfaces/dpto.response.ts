export interface DptoReponse {
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
    ubicacion:          Ubicacion;
    servicios:          ServicioAsignacion[];
    user:               User;
}

export interface DptoPost {
    ubicacion:          DptoPostUbicacion;
    departamento:       DepartamentoPost;
    serviciosAsignados?: ServiciosAsignadoPost[];
}

export interface DepartamentoPost {
    nombre:             string;
    descripcion:        string;
    valoracion:         number;
    fecha_construccion: Date;
    apreciacion:        number;
    habitaciones:       number;
    banos:              number;
}

export interface ServiciosAsignadoPost {
    encargado:    string;
    id_departamento: string;
    id_servicio:  string;
    pagoArchivo?: PagoArchivoPost;
}

export interface PagoArchivoPost {
    pago:    PagoPost;
    archivo: PagoArchivoArchivoPost;
}


export enum ESTADO_PAGO {
    PAGADO = 'pagado',
    PENDIENTE = 'pendiente',
    VENCIDO = 'vencido'
}

export interface PagoArchivoArchivoPost {
    tipo: string;
    url:  string;
}

export interface PagoPost {
    periodicidad:      number;
    fecha_pago:        Date;
    fecha_pagar:       Date;
    fecha_vencimiento: Date;
    estado:            string;
}

export interface DptoPostUbicacion {
    ubicacion: UbicacionUbicacionPost;
    archivo?:   UbicacionArchivoPost;
}

export interface UbicacionArchivoPost {
    nombre: string;
    tipo:   string;
    url:    string;
}

export interface UbicacionUbicacionPost{
    cod_postal: string;
    estado:     string;
    municipio:  string;
    colonia:    string;
    calle:      string;
    num_ext:    string;
    num_int:    string;
}



export interface ServicioAsignacion {
    id:        string;
    estado:    string;
    encargado: string;
    servicio:  ServicioServicio;
    pago:      Pago | null;
}

export interface Pago {
    id:                string;
    periodicidad:      number;
    fecha_pago:        Date;
    fecha_pagar:       Date;
    fecha_vencimiento: Date;
    estado:            string;
    archivo:          Archivo;
}

export interface ServicioServicio {
    id:          string;
    nombre:      string;
    descripcion: string;
    estado:      string;
}

export interface Ubicacion {
    id:         string;
    cod_postal: string;
    estado:     string;
    municipio:  string;
    colonia:    string;
    calle:      string;
    num_ext:    string;
    num_int:    null;
    referencia: null;
    archivo:    Archivo;
}

export interface Archivo {
    id:             string;
    nombre:         string;
    fecha_creacion: Date;
    url:            string;
    tipo:           string;
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
