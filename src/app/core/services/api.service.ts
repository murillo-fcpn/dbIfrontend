import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';
import {
  Servicio,
  ProveedorServicio,
  Medidor,
  LecturaServicio,
  TipoReclamo,
  EstadoReclamo,
  Reclamo
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  // Servicios
  getServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.baseUrl}/api/servicios/`)
      .pipe(catchError(this.handleError));
  }

  // Proveedores
  getProveedores(): Observable<ProveedorServicio[]> {
    return this.http.get<ProveedorServicio[]>(`${this.baseUrl}/api/proveedores/`)
      .pipe(catchError(this.handleError));
  }

  // Medidores
  getMedidores(): Observable<Medidor[]> {
    return this.http.get<Medidor[]>(`${this.baseUrl}/api/medidores/`)
      .pipe(catchError(this.handleError));
  }

  // Lecturas
  getLecturas(): Observable<LecturaServicio[]> {
    return this.http.get<LecturaServicio[]>(`${this.baseUrl}/api/lecturas/`)
      .pipe(catchError(this.handleError));
  }

  // Tipos de Reclamo
  getTiposReclamo(): Observable<TipoReclamo[]> {
    return this.http.get<TipoReclamo[]>(`${this.baseUrl}/api/tipos_reclamo/`)
      .pipe(catchError(this.handleError));
  }

  // Estados de Reclamo
  getEstadosReclamo(): Observable<EstadoReclamo[]> {
    return this.http.get<EstadoReclamo[]>(`${this.baseUrl}/api/estados_reclamo/`)
      .pipe(catchError(this.handleError));
  }

  // Reclamos
  getReclamos(): Observable<Reclamo[]> {
    return this.http.get<Reclamo[]>(`${this.baseUrl}/api/reclamos/`)
      .pipe(catchError(this.handleError));
  }
}
