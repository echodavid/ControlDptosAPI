export interface EstadisticasAdmin {
    dptosOcupados: number;
    dptosDisponibles: number;
    dptosTotal: number;
    usersTotal: number;
    reportesPendientes: number;
    reportesAtendidos: number;
    reportesTotal: number;
    pagosTotal: number;
    pagosPendientes: number;
    pagosPagados: number;
  }

export interface EstadisticasUser {
  dptosAsignados:     number;
  reportesTotales:    number;
  reportesAtentidos:  number;
  reportesPendientes: number;
  pagosTotales:       number;
  pagosPendientes:    number;
  pagosPagados:       number;
}
