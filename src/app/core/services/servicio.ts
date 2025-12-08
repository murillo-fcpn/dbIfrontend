import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Servicio } from '../interfaces/servicios';

@Injectable({
  providedIn: 'root',
})
export class ServicioSrv {
  
  #http = inject(HttpClient);
  #baseUrl = `${environment.apiUrl}/api`;
  servicios = signal<Servicio[]>([]);

  constructor() { 
    this.getServicios();
  }

  getServicios() {
    this.#http.get<Servicio[]>(`${this.#baseUrl}/servicios`).subscribe((data) => {
      this.servicios.set(data);
    });
  }

}
