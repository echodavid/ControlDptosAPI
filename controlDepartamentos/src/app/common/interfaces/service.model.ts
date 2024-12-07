export interface ServiceAssignment {
  encargado: string;
  id_servicio: string;
  pagoArchivo?: {
    pago: {
      periodicidad: number;
      fecha_pago: string;
      fecha_pagar: string;
      fecha_vencimiento: string;
      estado: string;
    };
    archivo: {
      tipo: string;
      url: string;
    };
  };
}