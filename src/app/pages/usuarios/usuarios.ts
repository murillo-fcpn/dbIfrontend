import { Component, inject, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsersSrv } from '../../core/services/users';
import { Ciudadano } from '../../core/interfaces';

@Component({
  selector: 'app-usuarios',
  imports: [
    CommonModule,
    FormsModule,
    MatTabsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss',
})
export class Usuarios implements OnInit, AfterViewInit {
  usersSrv = inject(UsersSrv);
  
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  private map?: L.Map;
  private marker?: L.Marker;
  
  // Display columns for tables
  cuentasColumns = ['id', 'usuario', 'email', 'rol_id', 'estado'];
  ciudadanosColumns = ['id', 'nombre', 'apellido', 'ci', 'telefono', 'email'];
  rolesColumns = ['id', 'nombre', 'descripcion', 'estado'];
  permisosColumns = ['id', 'nombre', 'descripcion', 'estado'];
  notificacionesColumns = ['id', 'titulo', 'tipo', 'fecha_hora', 'estado'];
  
  // Form for adding ciudadano
  showAddCiudadanoForm = false;
  newCiudadano: Ciudadano = {
    nombre: '',
    apellido: '',
    ci: '',
    telefono: '',
    email: '',
    direccion: '',
    latitud: undefined,
    longitud: undefined
  };

  ngOnInit() {
    this.loadAllData();
  }

  ngAfterViewInit() {
    // Initialize map when form is shown
  }

  loadAllData() {
    this.usersSrv.getCuentas();
    this.usersSrv.getCiudadanos();
    this.usersSrv.getRoles();
    this.usersSrv.getPermisos();
    this.usersSrv.getNotificaciones();
  }

  toggleAddCiudadanoForm() {
    this.showAddCiudadanoForm = !this.showAddCiudadanoForm;
    if (!this.showAddCiudadanoForm) {
      this.resetCiudadanoForm();
      if (this.map) {
        this.map.remove();
        this.map = undefined;
      }
    } else {
      // Initialize map after view is updated
      setTimeout(() => this.initMap(), 100);
    }
  }

  addCiudadano() {
    if (this.newCiudadano.nombre && this.newCiudadano.apellido && this.newCiudadano.ci) {
      this.usersSrv.addCiudadano(this.newCiudadano).subscribe({
        next: () => {
          this.usersSrv.getCiudadanos();
          this.resetCiudadanoForm();
          this.showAddCiudadanoForm = false;
        },
        error: (err) => console.error('Error adding ciudadano:', err)
      });
    }
  }

  resetCiudadanoForm() {
    this.newCiudadano = {
      nombre: '',
      apellido: '',
      ci: '',
      telefono: '',
      email: '',
      direccion: '',
      latitud: undefined,
      longitud: undefined
    };
    if (this.marker) {
      this.marker.remove();
      this.marker = undefined;
    }
  }

  private initMap() {
    if (!this.mapContainer) return;

    // Default center: La Paz, Bolivia
    const defaultLat = -16.5000;
    const defaultLng = -68.1500;

    this.map = L.map(this.mapContainer.nativeElement).setView([defaultLat, defaultLng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(this.map);

    // Add click event to map
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.onMapClick(e);
    });

    // Fix for marker icon issue in Leaflet with Angular
    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
    const iconDefault = L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;
  }

  private onMapClick(e: L.LeafletMouseEvent) {
    const { lat, lng } = e.latlng;
    
    // Update form values
    this.newCiudadano.latitud = lat;
    this.newCiudadano.longitud = lng;

    // Remove existing marker if any
    if (this.marker) {
      this.marker.remove();
    }

    // Add new marker
    if (this.map) {
      this.marker = L.marker([lat, lng]).addTo(this.map);
      this.marker.bindPopup(`Lat: ${lat.toFixed(6)}<br>Lng: ${lng.toFixed(6)}`).openPopup();
    }
  }
}
