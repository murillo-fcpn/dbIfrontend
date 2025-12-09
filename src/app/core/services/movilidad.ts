import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { 
  TipoTransporte,
  TipoIncidente,
  Vehiculo,
  Conductor,
  Ruta,
  Parada,
  Horario,
  Trayecto,
  IncidenteTransito
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class MovilidadSrv {
  
  #http = inject(HttpClient);
  #baseUrl = `${environment.apiUrl}/api`;
  
  // Signals para todas las entidades
  tiposTransporte = signal<TipoTransporte[]>([]);
  tiposIncidente = signal<TipoIncidente[]>([]);
  vehiculos = signal<Vehiculo[]>([]);
  conductores = signal<Conductor[]>([]);
  rutas = signal<Ruta[]>([]);
  paradas = signal<Parada[]>([]);
  horarios = signal<Horario[]>([]);
  trayectos = signal<Trayecto[]>([]);
  incidentesTransito = signal<IncidenteTransito[]>([]);
  
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor() { 
    this.loadAllData();
  }

  // Cargar todos los datos disponibles
  loadAllData() {
    this.getTiposTransporte();
    this.getTiposIncidente();
    this.getVehiculos();
    this.getConductores();
    this.getRutas();
    // Los siguientes endpoints no existen aún en el backend
    // this.getParadas();
    // this.getHorarios();
    // this.getTrayectos();
    // this.getIncidentesTransito();
  }

  // ==================== TIPOS DE TRANSPORTE ====================
  getTiposTransporte() {
    this.loading.set(true);
    this.#http.get<TipoTransporte[]>(`${this.#baseUrl}/tipos-transporte`).pipe(
      tap(() => this.loading.set(false)),
      catchError(err => this.handleError(err))
    ).subscribe((data) => {
      this.tiposTransporte.set(data);
    });
  }

  addTipoTransporte(tipo: Partial<TipoTransporte>): Observable<TipoTransporte> {
    return this.#http.post<TipoTransporte>(`${this.#baseUrl}/tipos-transporte`, tipo).pipe(
      tap(() => this.getTiposTransporte()),
      catchError(err => this.handleError(err))
    );
  }

  updateTipoTransporte(id: number, tipo: Partial<TipoTransporte>): Observable<TipoTransporte> {
    return this.#http.put<TipoTransporte>(`${this.#baseUrl}/tipos-transporte/${id}`, tipo).pipe(
      tap(() => this.getTiposTransporte()),
      catchError(err => this.handleError(err))
    );
  }

  deleteTipoTransporte(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#baseUrl}/tipos-transporte/${id}`).pipe(
      tap(() => this.getTiposTransporte()),
      catchError(err => this.handleError(err))
    );
  }

  // ==================== TIPOS DE INCIDENTE ====================
  getTiposIncidente() {
    this.loading.set(true);
    this.#http.get<TipoIncidente[]>(`${this.#baseUrl}/tipos-incidente`).pipe(
      tap(() => this.loading.set(false)),
      catchError(err => this.handleError(err))
    ).subscribe((data) => {
      this.tiposIncidente.set(data);
    });
  }

  addTipoIncidente(tipo: Partial<TipoIncidente>): Observable<TipoIncidente> {
    return this.#http.post<TipoIncidente>(`${this.#baseUrl}/tipos-incidente`, tipo).pipe(
      tap(() => this.getTiposIncidente()),
      catchError(err => this.handleError(err))
    );
  }

  updateTipoIncidente(id: number, tipo: Partial<TipoIncidente>): Observable<TipoIncidente> {
    return this.#http.put<TipoIncidente>(`${this.#baseUrl}/tipos-incidente/${id}`, tipo).pipe(
      tap(() => this.getTiposIncidente()),
      catchError(err => this.handleError(err))
    );
  }

  deleteTipoIncidente(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#baseUrl}/tipos-incidente/${id}`).pipe(
      tap(() => this.getTiposIncidente()),
      catchError(err => this.handleError(err))
    );
  }

  // ==================== VEHÍCULOS ====================
  getVehiculos() {
    this.loading.set(true);
    this.#http.get<Vehiculo[]>(`${this.#baseUrl}/vehiculos`).pipe(
      tap(() => this.loading.set(false)),
      catchError(err => this.handleError(err))
    ).subscribe((data) => {
      this.vehiculos.set(data);
    });
  }

  addVehiculo(vehiculo: Partial<Vehiculo>): Observable<Vehiculo> {
    return this.#http.post<Vehiculo>(`${this.#baseUrl}/vehiculos`, vehiculo).pipe(
      tap(() => this.getVehiculos()),
      catchError(err => this.handleError(err))
    );
  }

  updateVehiculo(id: number, vehiculo: Partial<Vehiculo>): Observable<Vehiculo> {
    return this.#http.put<Vehiculo>(`${this.#baseUrl}/vehiculos/${id}`, vehiculo).pipe(
      tap(() => this.getVehiculos()),
      catchError(err => this.handleError(err))
    );
  }

  deleteVehiculo(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#baseUrl}/vehiculos/${id}`).pipe(
      tap(() => this.getVehiculos()),
      catchError(err => this.handleError(err))
    );
  }

  // ==================== CONDUCTORES ====================
  getConductores() {
    this.loading.set(true);
    this.#http.get<Conductor[]>(`${this.#baseUrl}/conductores`).pipe(
      tap(() => this.loading.set(false)),
      catchError(err => this.handleError(err))
    ).subscribe((data) => {
      this.conductores.set(data);
    });
  }

  addConductor(conductor: Partial<Conductor>): Observable<Conductor> {
    return this.#http.post<Conductor>(`${this.#baseUrl}/conductores`, conductor).pipe(
      tap(() => this.getConductores()),
      catchError(err => this.handleError(err))
    );
  }

  updateConductor(id: number, conductor: Partial<Conductor>): Observable<Conductor> {
    return this.#http.put<Conductor>(`${this.#baseUrl}/conductores/${id}`, conductor).pipe(
      tap(() => this.getConductores()),
      catchError(err => this.handleError(err))
    );
  }

  deleteConductor(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#baseUrl}/conductores/${id}`).pipe(
      tap(() => this.getConductores()),
      catchError(err => this.handleError(err))
    );
  }

  // ==================== RUTAS ====================
  getRutas() {
    this.loading.set(true);
    this.#http.get<Ruta[]>(`${this.#baseUrl}/rutas`).pipe(
      tap(() => this.loading.set(false)),
      catchError(err => this.handleError(err))
    ).subscribe((data) => {
      this.rutas.set(data);
    });
  }

  addRuta(ruta: Partial<Ruta>): Observable<Ruta> {
    return this.#http.post<Ruta>(`${this.#baseUrl}/rutas`, ruta).pipe(
      tap(() => this.getRutas()),
      catchError(err => this.handleError(err))
    );
  }

  updateRuta(id: number, ruta: Partial<Ruta>): Observable<Ruta> {
    return this.#http.put<Ruta>(`${this.#baseUrl}/rutas/${id}`, ruta).pipe(
      tap(() => this.getRutas()),
      catchError(err => this.handleError(err))
    );
  }

  deleteRuta(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#baseUrl}/rutas/${id}`).pipe(
      tap(() => this.getRutas()),
      catchError(err => this.handleError(err))
    );
  }

  // ==================== MÉTODOS PREPARADOS PARA FUTUROS ENDPOINTS ====================
  
  // Paradas (endpoint no disponible aún)
  getParadas() {
    this.loading.set(true);
    this.#http.get<Parada[]>(`${this.#baseUrl}/paradas`).pipe(
      tap(() => this.loading.set(false)),
      catchError(err => this.handleError(err))
    ).subscribe((data) => {
      this.paradas.set(data);
    });
  }

  // Horarios (endpoint no disponible aún)
  getHorarios() {
    this.loading.set(true);
    this.#http.get<Horario[]>(`${this.#baseUrl}/horarios`).pipe(
      tap(() => this.loading.set(false)),
      catchError(err => this.handleError(err))
    ).subscribe((data) => {
      this.horarios.set(data);
    });
  }

  // Trayectos (endpoint no disponible aún)
  getTrayectos() {
    this.loading.set(true);
    this.#http.get<Trayecto[]>(`${this.#baseUrl}/trayectos`).pipe(
      tap(() => this.loading.set(false)),
      catchError(err => this.handleError(err))
    ).subscribe((data) => {
      this.trayectos.set(data);
    });
  }

  // Incidentes de Tránsito (endpoint no disponible aún)
  getIncidentesTransito() {
    this.loading.set(true);
    this.#http.get<IncidenteTransito[]>(`${this.#baseUrl}/incidentes-transito`).pipe(
      tap(() => this.loading.set(false)),
      catchError(err => this.handleError(err))
    ).subscribe((data) => {
      this.incidentesTransito.set(data);
    });
  }

  // ==================== MANEJO DE ERRORES ====================
  private handleError(error: any): Observable<never> {
    console.error('Error en MovilidadSrv:', error);
    this.loading.set(false);
    this.error.set(error.message || 'Error desconocido');
    return throwError(() => error);
  }
}
