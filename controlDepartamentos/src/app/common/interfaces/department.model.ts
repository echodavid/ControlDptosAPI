export interface Department {
  nombre: string;
  descripcion: string;
  valoracion: number;
  fecha_construccion: string;
  apreciacion: number;
  habitaciones: number;
  banos: number;
}

export interface DepartmentState {
  departments: Department[];
  loading: boolean;
  error: string | null;
}