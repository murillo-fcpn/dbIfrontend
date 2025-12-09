import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { 
  Servicio, 
  ProveedorServicio, 
  Medidor, 
  LecturaServicio, 
  TipoReclamo, 
  EstadoReclamo, 
  Reclamo,
  CorteProgramado 
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class ServicioSrv {
  
  #http = inject(HttpClient);
  #baseUrl = `${environment.apiUrl}/api`;
  
  // Signals para todas las entidades
  servicios = signal<Servicio[]>([]);
  proveedores = signal<ProveedorServicio[]>([]);
  medidores = signal<Medidor[]>([]);
  lecturas = signal<LecturaServicio[]>([]);
  tiposReclamo = signal<TipoReclamo[]>([]);
  estadosReclamo = signal<EstadoReclamo[]>([]);
  reclamos = signal<Reclamo[]>([]);
  cortesProgramados = signal<CorteProgramado[]>([]);
  
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor() { 
    this.loadAllData();
  }

  // Cargar todos los datos disponibles
  loadAllData() {
    this.getServicios();
    this.getProveedores();
    this.getMedidores();
    this.getTiposReclamo();
    // Los siguientes endpoints no existen aún en el backend
    // this.getLecturas();
    // this.getEstadosReclamo();
    // this.getReclamos();
    // this.getCortesProgramados();
  }

  // ==================== SERVICIOS ====================
  getServicios() {
    this.loading.set(true);
    this.#http.get<Servicio[]>(`${this.#baseUrl}/servicios`).pipe(
      tap(() => this.loading.set(false)),
      catchError(err => this.handleError(err))
    ).subscribe((data) => {
      this.servicios.set(data);
    });
  }

  addServicio(servicio: Partial<Servicio>): Observable<Servicio> {
    return this.#http.post<Servicio>(`${this.#baseUrl}/servicios`, servicio).pipe(
      tap(() => this.getServicios()),
      catchError(err => this.handleError(err))
    );
  }

  updateServicio(id: number, servicio: Partial<Servicio>): Observable<Servicio> {
    return this.#http.put<Servicio>(`${this.#baseUrl}/servicios/${id}`, servicio).pipe(
      tap(() => this.getServicios()),
      catchError(err => this.handleError(err))
    );
  }

  deleteServicio(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#baseUrl}/servicios/${id}`).pipe(
      tap(() => this.getServicios()),
      catchError(err => this.handleError(err))
    );
  }

  // ==================== PROVEEDORES ====================
  getProveedores() {
    this.loading.set(true);
    this.#http.get<ProveedorServicio[]>(`${this.#baseUrl}/proveedores`).pipe(
      tap(() => this.loading.set(false)),
      catchError(err => this.handleError(err))
    ).subscribe((data) => {
      this.proveedores.set(data);
    });
  }

  addProveedor(proveedor: Partial<ProveedorServicio>): Observable<ProveedorServicio> {
    return this.#http.post<ProveedorServicio>(`${this.#baseUrl}/proveedores`, proveedor).pipe(
      tap(() => this.getProveedores()),
      catchError(err => this.handleError(err))
    );
  }

  updateProveedor(id: number, proveedor: Partial<ProveedorServicio>): Observable<ProveedorServicio> {
    return this.#http.put<ProveedorServicio>(`${this.#baseUrl}/proveedores/${id}`, proveedor).pipe(
      tap(() => this.getProveedores()),
      catchError(err => this.handleError(err))
    );
  }

  deleteProveedor(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#baseUrl}/proveedores/${id}`).pipe(
      tap(() => this.getProveedores()),
      catchError(err => this.handleError(err))
    );
  }

  // ==================== MEDIDORES ====================
  getMedidores() {
    this.loading.set(true);
    this.#http.get<Medidor[]>(`${this.#baseUrl}/medidores`).pipe(
      tap(() => this.loading.set(false)),
      catchError(err => this.handleError(err))
    ).subscribe((data) => {
      this.medidores.set(data);
    });
  }

  addMedidor(medidor: Partial<Medidor>): Observable<Medidor> {
    return this.#http.post<Medidor>(`${this.#baseUrl}/medidores`, medidor).pipe(
      tap(() => this.getMedidores()),
      catchError(err => this.handleError(err))
    );
  }

  updateMedidor(id: number, medidor: Partial<Medidor>): Observable<Medidor> {
    return this.#http.put<Medidor>(`${this.#baseUrl}/medidores/${id}`, medidor).pipe(
      tap(() => this.getMedidores()),
      catchError(err => this.handleError(err))
    );
  }

  deleteMedidor(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#baseUrl}/medidores/${id}`).pipe(
      tap(() => this.getMedidores()),
      catchError(err => this.handleError(err))
    );
  }

  // ==================== TIPOS DE RECLAMO ====================
  getTiposReclamo() {
    this.loading.set(true);
    this.#http.get<TipoReclamo[]>(`${this.#baseUrl}/tipos-reclamo`).pipe(
      tap(() => this.loading.set(false)),
      catchError(err => this.handleError(err))
    ).subscribe((data) => {
      this.tiposReclamo.set(data);
    });
  }

  addTipoReclamo(tipo: Partial<TipoReclamo>): Observable<TipoReclamo> {
    return this.#http.post<TipoReclamo>(`${this.#baseUrl}/tipos-reclamo`, tipo).pipe(
      tap(() => this.getTiposReclamo()),
      catchError(err => this.handleError(err))
    );
  }

  updateTipoReclamo(id: number, tipo: Partial<TipoReclamo>): Observable<TipoReclamo> {
    return this.#http.put<TipoReclamo>(`${this.#baseUrl}/tipos-reclamo/${id}`, tipo).pipe(
      tap(() => this.getTiposReclamo()),
      catchError(err => this.handleError(err))
    );
  }

  deleteTipoReclamo(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#baseUrl}/tipos-reclamo/${id}`).pipe(
      tap(() => this.getTiposReclamo()),
      catchError(err => this.handleError(err))
    );
  }

  // ==================== MÉTODOS PREPARADOS PARA FUTUROS ENDPOINTS ====================
  
  // Lecturas (endpoint no disponible aún)
  getLecturas() {
    this.loading.set(true);
    this.#http.get<LecturaServicio[]>(`${this.#baseUrl}/lecturas`).pipe(
      tap(() => this.loading.set(false)),
      catchError(err => this.handleError(err))
    ).subscribe((data) => {
      this.lecturas.set(data);
    });
  }

  // Estados de Reclamo (endpoint no disponible aún)
  getEstadosReclamo() {
    this.loading.set(true);
    this.#http.get<EstadoReclamo[]>(`${this.#baseUrl}/estados-reclamo`).pipe(
      tap(() => this.loading.set(false)),
      catchError(err => this.handleError(err))
    ).subscribe((data) => {
      this.estadosReclamo.set(data);
    });
  }

  // Reclamos (endpoint no disponible aún)
  getReclamos() {
    this.loading.set(true);
    this.#http.get<Reclamo[]>(`${this.#baseUrl}/reclamos`).pipe(
      tap(() => this.loading.set(false)),
      catchError(err => this.handleError(err))
    ).subscribe((data) => {
      this.reclamos.set(data);
    });
  }

  // Cortes Programados (endpoint no disponible aún)
  getCortesProgramados() {
    this.loading.set(true);
    this.#http.get<CorteProgramado[]>(`${this.#baseUrl}/cortes-programados`).pipe(
      tap(() => this.loading.set(false)),
      catchError(err => this.handleError(err))
    ).subscribe((data) => {
      this.cortesProgramados.set(data);
    });
  }

  // ==================== MANEJO DE ERRORES ====================
  private handleError(error: any): Observable<never> {
    console.error('Error en ServicioSrv:', error);
    this.loading.set(false);
    this.error.set(error.message || 'Error desconocido');
    return throwError(() => error);
  }
}
