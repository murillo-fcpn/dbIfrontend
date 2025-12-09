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

// ==================== SEGURIDAD CIUDADANA ====================

export interface Patrullaje {
  id_patrullaje: number;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  zona: string;
  latitud_inicio: number;
  longitud_inicio: number;
  latitud_fin: number;
  longitud_fin: number;
  estado: string;
  direccion: string;
}

export interface Camara {
  id_camara: number;
  latitud: number;
  longitud: number;
  direccion: string;
  estado: string;
  fecha_instalacion: string;
  resolucion: string;
}

export interface IncidenteSeguridad {
  id_incidente_seg: number;
  descripcion: string;
  hora: string;
  fecha: string;
  latitud: number;
  longitud: number;
  estado: string;
}

export interface Denuncia {
  id_denuncia: number;
  descripcion: string;
  hora: string;
  evidencia_url: string;
  estado: string;
}

export interface AgenteSeguridad {
  id_agente: number;
  nombre: string;
  apellido: string;
  ci: string;
  placa: string;
  telefono: string;
  estado: string;
}

// ==================== MEDIO AMBIENTE ====================

export interface Sensor {
  id_sensor: number;
  codigo: string;
  tipo: string; // ruido, aire, temperatura, humedad
  ubicacion: string;
  latitud: number;
  longitud: number;
  fecha_instalacion: string;
  estado: string;
}

export interface LecturaSensor {
  id_lectura_sensor: number;
  valor: number;
  unidad_medida: string;
  fecha: string;
  hora: string;
  tipo_lectura: string;
}

export interface AlertaAmbiental {
  id_alerta: number;
  fecha: string;
  hora: string;
  tipo_alerta: string;
  descripcion: string;
  estado: string;
}

export interface Zona {
  id_zona: number;
  nombre: string;
  poligono_geojson: string;
  descripcion: string;
  tipo: string; // residencial, industrial, verde
}
