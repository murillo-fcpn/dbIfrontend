import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { 
  Sensor,
  LecturaSensor,
  AlertaAmbiental,
  Zona
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class MedioAmbienteSrv {
  
  #http = inject(HttpClient);
  #baseUrl = `${environment.apiUrl}/api`;
  
  // Signals para todas las entidades
  sensores = signal<Sensor[]>([]);
  lecturasSensor = signal<LecturaSensor[]>([]);
  alertasAmbientales = signal<AlertaAmbiental[]>([]);
  zonas = signal<Zona[]>([]);
  
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor() { 
    this.loadAllData();
  }

  // Cargar todos los datos disponibles
  loadAllData() {
    this.getSensores();
    this.getLecturasSensor();
    this.getAlertasAmbientales();
    this.getZonas();
  }

  // ==================== SENSORES ====================
  getSensores() {
    this.loading.set(true);
    this.#http.get<Sensor[]>(`${this.#baseUrl}/sensores`).pipe(
      tap(() => this.loading.set(false)),
      catchError(err => this.handleError(err))
    ).subscribe((data) => {
      this.sensores.set(data);
    });
  }

  addSensor(sensor: Partial<Sensor>): Observable<Sensor> {
    return this.#http.post<Sensor>(`${this.#baseUrl}/sensores`, sensor).pipe(
      tap(() => this.getSensores()),
      catchError(err => this.handleError(err))
    );
  }

  updateSensor(id: number, sensor: Partial<Sensor>): Observable<Sensor> {
    return this.#http.put<Sensor>(`${this.#baseUrl}/sensores/${id}`, sensor).pipe(
      tap(() => this.getSensores()),
      catchError(err => this.handleError(err))
    );
  }

  deleteSensor(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#baseUrl}/sensores/${id}`).pipe(
      tap(() => this.getSensores()),
      catchError(err => this.handleError(err))
    );
  }

  // ==================== LECTURAS DE SENSOR ====================
  getLecturasSensor() {
    this.loading.set(true);
    this.#http.get<LecturaSensor[]>(`${this.#baseUrl}/lecturas-sensor`).pipe(
      tap(() => this.loading.set(false)),
      catchError(err => this.handleError(err))
    ).subscribe((data) => {
      this.lecturasSensor.set(data);
    });
  }

  addLecturaSensor(lectura: Partial<LecturaSensor>): Observable<LecturaSensor> {
    return this.#http.post<LecturaSensor>(`${this.#baseUrl}/lecturas-sensor`, lectura).pipe(
      tap(() => this.getLecturasSensor()),
      catchError(err => this.handleError(err))
    );
  }

  updateLecturaSensor(id: number, lectura: Partial<LecturaSensor>): Observable<LecturaSensor> {
    return this.#http.put<LecturaSensor>(`${this.#baseUrl}/lecturas-sensor/${id}`, lectura).pipe(
      tap(() => this.getLecturasSensor()),
      catchError(err => this.handleError(err))
    );
  }

  deleteLecturaSensor(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#baseUrl}/lecturas-sensor/${id}`).pipe(
      tap(() => this.getLecturasSensor()),
      catchError(err => this.handleError(err))
    );
  }

  // ==================== ALERTAS AMBIENTALES ====================
  getAlertasAmbientales() {
    this.loading.set(true);
    this.#http.get<AlertaAmbiental[]>(`${this.#baseUrl}/alertas-ambientales`).pipe(
      tap(() => this.loading.set(false)),
      catchError(err => this.handleError(err))
    ).subscribe((data) => {
      this.alertasAmbientales.set(data);
    });
  }

  addAlertaAmbiental(alerta: Partial<AlertaAmbiental>): Observable<AlertaAmbiental> {
    return this.#http.post<AlertaAmbiental>(`${this.#baseUrl}/alertas-ambientales`, alerta).pipe(
      tap(() => this.getAlertasAmbientales()),
      catchError(err => this.handleError(err))
    );
  }

  updateAlertaAmbiental(id: number, alerta: Partial<AlertaAmbiental>): Observable<AlertaAmbiental> {
    return this.#http.put<AlertaAmbiental>(`${this.#baseUrl}/alertas-ambientales/${id}`, alerta).pipe(
      tap(() => this.getAlertasAmbientales()),
      catchError(err => this.handleError(err))
    );
  }

  deleteAlertaAmbiental(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#baseUrl}/alertas-ambientales/${id}`).pipe(
      tap(() => this.getAlertasAmbientales()),
      catchError(err => this.handleError(err))
    );
  }

  // ==================== ZONAS ====================
  getZonas() {
    this.loading.set(true);
    this.#http.get<Zona[]>(`${this.#baseUrl}/zonas`).pipe(
      tap(() => this.loading.set(false)),
      catchError(err => this.handleError(err))
    ).subscribe((data) => {
      this.zonas.set(data);
    });
  }

  addZona(zona: Partial<Zona>): Observable<Zona> {
    return this.#http.post<Zona>(`${this.#baseUrl}/zonas`, zona).pipe(
      tap(() => this.getZonas()),
      catchError(err => this.handleError(err))
    );
  }

  updateZona(id: number, zona: Partial<Zona>): Observable<Zona> {
    return this.#http.put<Zona>(`${this.#baseUrl}/zonas/${id}`, zona).pipe(
      tap(() => this.getZonas()),
      catchError(err => this.handleError(err))
    );
  }

  deleteZona(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#baseUrl}/zonas/${id}`).pipe(
      tap(() => this.getZonas()),
      catchError(err => this.handleError(err))
    );
  }

  // ==================== MANEJO DE ERRORES ====================
  private handleError(error: any): Observable<never> {
    console.error('Error en MedioAmbienteSrv:', error);
    this.loading.set(false);
    this.error.set(error.message || 'Error desconocido');
    return throwError(() => error);
  }
}
