export interface Location {
  ubicacion: {
    cod_postal: string;
    estado: string;
    municipio: string;
    colonia: string;
    calle: string;
    num_ext: string;
  };
  archivo: {
    nombre: string;
    tipo: string;
    url: string;
  };
}