import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { 
  Patrullaje,
  Camara,
  IncidenteSeguridad,
  Denuncia,
  AgenteSeguridad
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class SeguridadSrv {
  
  #http = inject(HttpClient);
  #baseUrl = `${environment.apiUrl}/api`;
  
  // Signals para todas las entidades
  patrullajes = signal<Patrullaje[]>([]);
  camaras = signal<Camara[]>([]);
  incidentesSeguridad = signal<IncidenteSeguridad[]>([]);
  denuncias = signal<Denuncia[]>([]);
  agentesSeguridad = signal<AgenteSeguridad[]>([]);
  
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor() { 
    this.loadAllData();
  }

  // Cargar todos los datos disponibles
  loadAllData() {
    // Todos los endpoints no están disponibles aún en el backend
    // Descomentar cuando estén listos:
    // this.getPatrullajes();
    // this.getCamaras();
    // this.getIncidentesSeguridad();
    // this.getDenuncias();
    // this.getAgentesSeguridad();
  }

  // ==================== PATRULLAJES ====================
  getPatrullajes() {
    this.loading.set(true);
    this.#http.get<Patrullaje[]>(`${this.#baseUrl}/patrullajes`).pipe(
      tap(() => this.loading.set(false)),
      catchError(err => this.handleError(err))
    ).subscribe((data) => {
      this.patrullajes.set(data);
    });
  }

  addPatrullaje(patrullaje: Partial<Patrullaje>): Observable<Patrullaje> {
    return this.#http.post<Patrullaje>(`${this.#baseUrl}/patrullajes`, patrullaje).pipe(
      tap(() => this.getPatrullajes()),
      catchError(err => this.handleError(err))
    );
  }

  updatePatrullaje(id: number, patrullaje: Partial<Patrullaje>): Observable<Patrullaje> {
    return this.#http.put<Patrullaje>(`${this.#baseUrl}/patrullajes/${id}`, patrullaje).pipe(
      tap(() => this.getPatrullajes()),
      catchError(err => this.handleError(err))
    );
  }

  deletePatrullaje(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#baseUrl}/patrullajes/${id}`).pipe(
      tap(() => this.getPatrullajes()),
      catchError(err => this.handleError(err))
    );
  }

  // ==================== CÁMARAS ====================
  getCamaras() {
    this.loading.set(true);
    this.#http.get<Camara[]>(`${this.#baseUrl}/camaras`).pipe(
      tap(() => this.loading.set(false)),
      catchError(err => this.handleError(err))
    ).subscribe((data) => {
      this.camaras.set(data);
    });
  }

  addCamara(camara: Partial<Camara>): Observable<Camara> {
    return this.#http.post<Camara>(`${this.#baseUrl}/camaras`, camara).pipe(
      tap(() => this.getCamaras()),
      catchError(err => this.handleError(err))
    );
  }

  updateCamara(id: number, camara: Partial<Camara>): Observable<Camara> {
    return this.#http.put<Camara>(`${this.#baseUrl}/camaras/${id}`, camara).pipe(
      tap(() => this.getCamaras()),
      catchError(err => this.handleError(err))
    );
  }

  deleteCamara(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#baseUrl}/camaras/${id}`).pipe(
      tap(() => this.getCamaras()),
      catchError(err => this.handleError(err))
    );
  }

  // ==================== INCIDENTES DE SEGURIDAD ====================
  getIncidentesSeguridad() {
    this.loading.set(true);
    this.#http.get<IncidenteSeguridad[]>(`${this.#baseUrl}/incidentes-seguridad`).pipe(
      tap(() => this.loading.set(false)),
      catchError(err => this.handleError(err))
    ).subscribe((data) => {
      this.incidentesSeguridad.set(data);
    });
  }

  addIncidenteSeguridad(incidente: Partial<IncidenteSeguridad>): Observable<IncidenteSeguridad> {
    return this.#http.post<IncidenteSeguridad>(`${this.#baseUrl}/incidentes-seguridad`, incidente).pipe(
      tap(() => this.getIncidentesSeguridad()),
      catchError(err => this.handleError(err))
    );
  }

  updateIncidenteSeguridad(id: number, incidente: Partial<IncidenteSeguridad>): Observable<IncidenteSeguridad> {
    return this.#http.put<IncidenteSeguridad>(`${this.#baseUrl}/incidentes-seguridad/${id}`, incidente).pipe(
      tap(() => this.getIncidentesSeguridad()),
      catchError(err => this.handleError(err))
    );
  }

  deleteIncidenteSeguridad(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#baseUrl}/incidentes-seguridad/${id}`).pipe(
      tap(() => this.getIncidentesSeguridad()),
      catchError(err => this.handleError(err))
    );
  }

  // ==================== DENUNCIAS ====================
  getDenuncias() {
    this.loading.set(true);
    this.#http.get<Denuncia[]>(`${this.#baseUrl}/denuncias`).pipe(
      tap(() => this.loading.set(false)),
      catchError(err => this.handleError(err))
    ).subscribe((data) => {
      this.denuncias.set(data);
    });
  }

  addDenuncia(denuncia: Partial<Denuncia>): Observable<Denuncia> {
    return this.#http.post<Denuncia>(`${this.#baseUrl}/denuncias`, denuncia).pipe(
      tap(() => this.getDenuncias()),
      catchError(err => this.handleError(err))
    );
  }

  updateDenuncia(id: number, denuncia: Partial<Denuncia>): Observable<Denuncia> {
    return this.#http.put<Denuncia>(`${this.#baseUrl}/denuncias/${id}`, denuncia).pipe(
      tap(() => this.getDenuncias()),
      catchError(err => this.handleError(err))
    );
  }

  deleteDenuncia(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#baseUrl}/denuncias/${id}`).pipe(
      tap(() => this.getDenuncias()),
      catchError(err => this.handleError(err))
    );
  }

  // ==================== AGENTES DE SEGURIDAD ====================
  getAgentesSeguridad() {
    this.loading.set(true);
    this.#http.get<AgenteSeguridad[]>(`${this.#baseUrl}/agentes-seguridad`).pipe(
      tap(() => this.loading.set(false)),
      catchError(err => this.handleError(err))
    ).subscribe((data) => {
      this.agentesSeguridad.set(data);
    });
  }

  addAgenteSeguridad(agente: Partial<AgenteSeguridad>): Observable<AgenteSeguridad> {
    return this.#http.post<AgenteSeguridad>(`${this.#baseUrl}/agentes-seguridad`, agente).pipe(
      tap(() => this.getAgentesSeguridad()),
      catchError(err => this.handleError(err))
    );
  }

  updateAgenteSeguridad(id: number, agente: Partial<AgenteSeguridad>): Observable<AgenteSeguridad> {
    return this.#http.put<AgenteSeguridad>(`${this.#baseUrl}/agentes-seguridad/${id}`, agente).pipe(
      tap(() => this.getAgentesSeguridad()),
      catchError(err => this.handleError(err))
    );
  }

  deleteAgenteSeguridad(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#baseUrl}/agentes-seguridad/${id}`).pipe(
      tap(() => this.getAgentesSeguridad()),
      catchError(err => this.handleError(err))
    );
  }

  // ==================== MANEJO DE ERRORES ====================
  private handleError(error: any): Observable<never> {
    console.error('Error en SeguridadSrv:', error);
    this.loading.set(false);
    this.error.set(error.message || 'Error desconocido');
    return throwError(() => error);
  }
}
