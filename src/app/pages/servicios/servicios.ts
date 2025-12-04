import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { forkJoin } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import {
  Servicio,
  ProveedorServicio,
  Medidor,
  LecturaServicio,
  TipoReclamo,
  EstadoReclamo,
  Reclamo
} from '../../core/models';

@Component({
  selector: 'app-servicios',
  imports: [
    CommonModule,
    MatTableModule,
    MatTabsModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './servicios.html',
  styleUrl: './servicios.scss',
})
export class Servicios implements OnInit {

  private apiService = inject(ApiService);
  // Datos

  // servicios: Servicio[] = [];
  servicios = signal<Servicio[]>([]);
  proveedores: ProveedorServicio[] = [];
  medidores: Medidor[] = [];
  lecturas: LecturaServicio[] = [];
  tiposReclamo: TipoReclamo[] = [];
  estadosReclamo: EstadoReclamo[] = [];
  reclamos: Reclamo[] = [];

  // Estados de carga
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  // Columnas para cada tabla
  serviciosColumns = ['id_servicio', 'nombre', 'tipo', 'descripcion', 'estado'];
  proveedoresColumns = ['id_proveedor', 'nombre', 'telefono', 'email', 'direccion', 'estado'];
  medidoresColumns = ['id_medidor', 'numero_serie', 'tipo', 'ubicacion', 'fecha_instalacion', 'estado'];
  lecturasColumns = ['id_lectura', 'lectura_anterior', 'lectura_actual', 'consumo', 'fecha_lectura', 'tipo_lectura'];
  tiposReclamoColumns = ['id_tipo_reclamo', 'nombre', 'descripcion'];
  estadosReclamoColumns = ['id_estado_reclamo', 'nombre', 'descripcion'];
  reclamosColumns = ['id_reclamo', 'descripcion', 'fecha_creacion', 'imagen_url'];

  
  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData(): void {
    this.loading.set(true);
    this.error.set(null);

    // Cargar todos los datos en paralelo usando forkJoin
    forkJoin({
      servicios: this.apiService.getServicios(),
      // proveedores: this.apiService.getProveedores(),
      // medidores: this.apiService.getMedidores(),
      // lecturas: this.apiService.getLecturas(),
      // tiposReclamo: this.apiService.getTiposReclamo(),
      // estadosReclamo: this.apiService.getEstadosReclamo(),
      // reclamos: this.apiService.getReclamos()
    }).subscribe({
      next: (data) => {
        this.servicios.set(data.servicios || []);
        // this.proveedores = data.proveedores || [];
        // this.medidores = data.medidores || [];
        // this.lecturas = data.lecturas || [];
        // this.tiposReclamo = data.tiposReclamo || [];
        // this.estadosReclamo = data.estadosReclamo || [];
        // this.reclamos = data.reclamos || [];
        this.loading.set(false);
        console.log('Datos cargados exitosamente:', data);
      },
      error: (err) => {
        this.error.set('Error al cargar los datos. Verifica que el backend esté corriendo en localhost:5000');
        this.loading.set(false);
        console.error('Error cargando datos:', err);
      }
    });
  }
}
