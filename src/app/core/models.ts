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

// ==================== MOVILIDAD URBANA ====================

export interface TipoTransporte {
  id_tipo_transporte: number;
  nombre: string;
  descripcion: string;
}

export interface TipoIncidente {
  id_tipo_incidente: number;
  nombre: string;
  descripcion: string;
  categoria: string; // transito, mecanico, seguridad
}

export interface Vehiculo {
  id_vehiculo: number;
  placa: string;
  capacidad_max: number;
  fecha_alta: string;
  estado: string;
  modelo: string;
  anio_fabricacion: number;
}

export interface Conductor {
  id_conductor: number;
  nombre: string;
  apellido: string;
  ci: string;
  telefono: string;
  email: string;
  licencia: string;
  fecha_vencimiento_certificado: string;
  estado: string;
}

export interface Ruta {
  id_ruta: number;
  nombre: string;
  distancia_km: number;
  tiempo_estimado_min: number;
  estado: string;
  color_mapa: string;
}

export interface Parada {
  id_parada: number;
  nombre: string;
  latitud: number;
  longitud: number;
  direccion: string;
  accesible: boolean;
  techo: boolean;
  orden: number;
}

export interface Horario {
  id_horario: number;
  dia_semana: string;
  hora_inicio: string;
  hora_fin: string;
}

export interface Trayecto {
  id_trayecto: number;
  fecha_hora_salida: string;
  fecha_hora_llegada: string;
  estado: string;
}

export interface IncidenteTransito {
  id_incidente: number;
  descripcion: string;
  fecha_inicio: string;
  fecha_fin: string;
  latitud: number;
  longitud: number;
  estado: string;
}
