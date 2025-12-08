export interface Ciudadano {
  id?: number;
  nombre: string;
  apellido: string;
  ci: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  latitud?: number;
  longitud?: number;
  fecha_nacimiento?: string;
  estado?: string;
}

export interface Cuenta {
  id?: number;
  usuario: string;
  email: string;
  rol_id: number;
  fecha_creacion?: string;
  estado?: string;
}

export interface Rol {
  id?: number;
  nombre: string;
  descripcion?: string;
  permisos?: string[];
  estado?: string;
}

export interface Permiso {
  id?: number;
  nombre: string;
  descripcion?: string;
  estado?: string;
}

export interface Notificacion {
  id?: number;
  titulo: string;
  mensaje: string;
  fecha_hora?: string;
  tipo?: string;
  ciudadano_id: number;
  estado?: string;
}
