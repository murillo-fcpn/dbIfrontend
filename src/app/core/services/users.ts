import { inject, Injectable, signal } from '@angular/core';
import { Cuenta, Ciudadano, Rol, Permiso, Notificacion } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UsersSrv {
  http = inject(HttpClient);
  currentUser = signal<Cuenta | null>(null);
  
  // API paths
  pathCuentas = `${environment.apiUrl}/api/cuentas`;
  pathCiudadanos = `${environment.apiUrl}/api/ciudadanos`;
  pathRoles = `${environment.apiUrl}/api/roles`;
  pathPermisos = `${environment.apiUrl}/api/permisos`;
  pathNotificaciones = `${environment.apiUrl}/api/notificaciones`;
  
  // Signals
  cuentas = signal<Cuenta[]>([]);
  ciudadanos = signal<Ciudadano[]>([]);
  roles = signal<Rol[]>([]);
  permisos = signal<Permiso[]>([]);
  notificaciones = signal<Notificacion[]>([]);

  login(user: Cuenta) {
    this.currentUser.set(user);
  }

  logout() {
    this.currentUser.set(null);
  }

  // Cuentas methods
  getCuentas() {
    this.http.get<Cuenta[]>(this.pathCuentas).subscribe((cuentas) => {
      this.cuentas.set(cuentas);
    });
  }

  // Ciudadanos methods
  getCiudadanos() {
    this.http.get<Ciudadano[]>(this.pathCiudadanos).subscribe((ciudadanos) => {
      this.ciudadanos.set(ciudadanos);
    });
  }

  addCiudadano(ciudadano: Ciudadano) {
    return this.http.post<Ciudadano>(this.pathCiudadanos, ciudadano);
  }

  // Roles methods
  getRoles() {
    this.http.get<Rol[]>(this.pathRoles).subscribe((roles) => {
      this.roles.set(roles);
    });
  }

  // Permisos methods
  getPermisos() {
    this.http.get<Permiso[]>(this.pathPermisos).subscribe((permisos) => {
      this.permisos.set(permisos);
    });
  }

  // Notificaciones methods
  getNotificaciones() {
    this.http.get<Notificacion[]>(this.pathNotificaciones).subscribe((notificaciones) => {
      this.notificaciones.set(notificaciones);
    });
  }
}


