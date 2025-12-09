// Interfaces para las entidades de la base de datos

export interface Servicio {
  id_servicio: number;
  nombre: string;
  tipo: string; // agua, luz, gas
  descripcion: string;
  estado: string;
}

export interface ProveedorServicio {
  id_proveedor: number;
  nombre: string;
  telefono: string;
  email: string;
  direccion: string;
  estado: string;
}

export interface Medidor {
  id_medidor: number;
  numero_serie: string;
  tipo: string;
  ubicacion: string;
  fecha_instalacion: string;
  estado: string;
}

export interface LecturaServicio {
  id_lectura: number;
  lectura_anterior: number;
  lectura_actual: number;
  consumo: number;
  fecha_lectura: string;
  tipo_lectura: string;
}

export interface TipoReclamo {
  id_tipo_reclamo: number;
  nombre: string;
  descripcion: string;
}

export interface EstadoReclamo {
  id_estado_reclamo: number;
  nombre: string;
  descripcion: string;
}

export interface Reclamo {
  id_reclamo: number;
  descripcion: string;
  fecha_creacion: string;
  imagen_url: string;
}

export interface CorteProgramado {
  id_corte: number;
  fecha_inicio: string;
  fecha_fin: string;
  motivo: string;
  zonas_afectadas: string;
  estado: string;
}
