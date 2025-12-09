import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MovilidadSrv } from '../../core/services/movilidad';
import { 
  TipoTransporte,
  TipoIncidente,
  Vehiculo,
  Conductor,
  Ruta
} from '../../core/models';

@Component({
  selector: 'app-movilidad',
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatTabsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
  ],
  templateUrl: './movilidad.html',
  styleUrl: './movilidad.scss',
})
export class Movilidad implements OnInit {

  movilidadSrv = inject(MovilidadSrv);

  // Display columns for tables
  tiposTransporteColumns = ['id_tipo_transporte', 'nombre', 'descripcion', 'acciones'];
  tiposIncidenteColumns = ['id_tipo_incidente', 'nombre', 'descripcion', 'categoria', 'acciones'];
  vehiculosColumns = ['id_vehiculo', 'placa', 'modelo', 'anio_fabricacion', 'capacidad_max', 'estado', 'acciones'];
  conductoresColumns = ['id_conductor', 'nombre', 'apellido', 'ci', 'licencia', 'telefono', 'estado', 'acciones'];
  rutasColumns = ['id_ruta', 'nombre', 'distancia_km', 'tiempo_estimado_min', 'color_mapa', 'estado', 'acciones'];

  // Form visibility flags
  showAddTipoTransporteForm = false;
  showAddTipoIncidenteForm = false;
  showAddVehiculoForm = false;
  showAddConductorForm = false;
  showAddRutaForm = false;

  // New entity forms
  newTipoTransporte: Partial<TipoTransporte> = {
    nombre: '',
    descripcion: ''
  };

  newTipoIncidente: Partial<TipoIncidente> = {
    nombre: '',
    descripcion: '',
    categoria: 'transito'
  };

  newVehiculo: Partial<Vehiculo> = {
    placa: '',
    modelo: '',
    anio_fabricacion: new Date().getFullYear(),
    capacidad_max: 0,
    fecha_alta: new Date().toISOString().split('T')[0],
    estado: 'activo'
  };

  newConductor: Partial<Conductor> = {
    nombre: '',
    apellido: '',
    ci: '',
    telefono: '',
    email: '',
    licencia: '',
    fecha_vencimiento_certificado: '',
    estado: 'activo'
  };

  newRuta: Partial<Ruta> = {
    nombre: '',
    distancia_km: 0,
    tiempo_estimado_min: 0,
    color_mapa: '#FF0000',
    estado: 'activo'
  };

  // Options
  categoriasIncidente = ['transito', 'mecanico', 'seguridad'];

  ngOnInit() {
    // Data is loaded automatically in the service constructor
  }

  // ==================== TIPOS DE TRANSPORTE ====================
  toggleAddTipoTransporteForm() {
    this.showAddTipoTransporteForm = !this.showAddTipoTransporteForm;
    if (!this.showAddTipoTransporteForm) {
      this.resetTipoTransporteForm();
    }
  }

  addTipoTransporte() {
    if (this.newTipoTransporte.nombre) {
      this.movilidadSrv.addTipoTransporte(this.newTipoTransporte).subscribe({
        next: () => {
          this.resetTipoTransporteForm();
          this.showAddTipoTransporteForm = false;
        },
        error: (err) => console.error('Error adding tipo transporte:', err)
      });
    }
  }

  deleteTipoTransporte(id: number) {
    if (confirm('¿Está seguro de eliminar este tipo de transporte?')) {
      this.movilidadSrv.deleteTipoTransporte(id).subscribe({
        error: (err) => console.error('Error deleting tipo transporte:', err)
      });
    }
  }

  resetTipoTransporteForm() {
    this.newTipoTransporte = {
      nombre: '',
      descripcion: ''
    };
  }

  // ==================== TIPOS DE INCIDENTE ====================
  toggleAddTipoIncidenteForm() {
    this.showAddTipoIncidenteForm = !this.showAddTipoIncidenteForm;
    if (!this.showAddTipoIncidenteForm) {
      this.resetTipoIncidenteForm();
    }
  }

  addTipoIncidente() {
    if (this.newTipoIncidente.nombre) {
      this.movilidadSrv.addTipoIncidente(this.newTipoIncidente).subscribe({
        next: () => {
          this.resetTipoIncidenteForm();
          this.showAddTipoIncidenteForm = false;
        },
        error: (err) => console.error('Error adding tipo incidente:', err)
      });
    }
  }

  deleteTipoIncidente(id: number) {
    if (confirm('¿Está seguro de eliminar este tipo de incidente?')) {
      this.movilidadSrv.deleteTipoIncidente(id).subscribe({
        error: (err) => console.error('Error deleting tipo incidente:', err)
      });
    }
  }

  resetTipoIncidenteForm() {
    this.newTipoIncidente = {
      nombre: '',
      descripcion: '',
      categoria: 'transito'
    };
  }

  // ==================== VEHÍCULOS ====================
  toggleAddVehiculoForm() {
    this.showAddVehiculoForm = !this.showAddVehiculoForm;
    if (!this.showAddVehiculoForm) {
      this.resetVehiculoForm();
    }
  }

  addVehiculo() {
    if (this.newVehiculo.placa && this.newVehiculo.modelo) {
      this.movilidadSrv.addVehiculo(this.newVehiculo).subscribe({
        next: () => {
          this.resetVehiculoForm();
          this.showAddVehiculoForm = false;
        },
        error: (err) => console.error('Error adding vehiculo:', err)
      });
    }
  }

  deleteVehiculo(id: number) {
    if (confirm('¿Está seguro de eliminar este vehículo?')) {
      this.movilidadSrv.deleteVehiculo(id).subscribe({
        error: (err) => console.error('Error deleting vehiculo:', err)
      });
    }
  }

  resetVehiculoForm() {
    this.newVehiculo = {
      placa: '',
      modelo: '',
      anio_fabricacion: new Date().getFullYear(),
      capacidad_max: 0,
      fecha_alta: new Date().toISOString().split('T')[0],
      estado: 'activo'
    };
  }

  // ==================== CONDUCTORES ====================
  toggleAddConductorForm() {
    this.showAddConductorForm = !this.showAddConductorForm;
    if (!this.showAddConductorForm) {
      this.resetConductorForm();
    }
  }

  addConductor() {
    if (this.newConductor.nombre && this.newConductor.apellido && this.newConductor.ci) {
      this.movilidadSrv.addConductor(this.newConductor).subscribe({
        next: () => {
          this.resetConductorForm();
          this.showAddConductorForm = false;
        },
        error: (err) => console.error('Error adding conductor:', err)
      });
    }
  }

  deleteConductor(id: number) {
    if (confirm('¿Está seguro de eliminar este conductor?')) {
      this.movilidadSrv.deleteConductor(id).subscribe({
        error: (err) => console.error('Error deleting conductor:', err)
      });
    }
  }

  resetConductorForm() {
    this.newConductor = {
      nombre: '',
      apellido: '',
      ci: '',
      telefono: '',
      email: '',
      licencia: '',
      fecha_vencimiento_certificado: '',
      estado: 'activo'
    };
  }

  // ==================== RUTAS ====================
  toggleAddRutaForm() {
    this.showAddRutaForm = !this.showAddRutaForm;
    if (!this.showAddRutaForm) {
      this.resetRutaForm();
    }
  }

  addRuta() {
    if (this.newRuta.nombre) {
      this.movilidadSrv.addRuta(this.newRuta).subscribe({
        next: () => {
          this.resetRutaForm();
          this.showAddRutaForm = false;
        },
        error: (err) => console.error('Error adding ruta:', err)
      });
    }
  }

  deleteRuta(id: number) {
    if (confirm('¿Está seguro de eliminar esta ruta?')) {
      this.movilidadSrv.deleteRuta(id).subscribe({
        error: (err) => console.error('Error deleting ruta:', err)
      });
    }
  }

  resetRutaForm() {
    this.newRuta = {
      nombre: '',
      distancia_km: 0,
      tiempo_estimado_min: 0,
      color_mapa: '#FF0000',
      estado: 'activo'
    };
  }
}
