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
import { ServicioSrv } from '../../core/services/servicio';
import { 
  Servicio, 
  ProveedorServicio, 
  Medidor, 
  TipoReclamo 
} from '../../core/models';

@Component({
  selector: 'app-servicios',
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
  ],
  templateUrl: './servicios.html',
  styleUrl: './servicios.scss',
})
export class Servicios implements OnInit {

  servicioSrv = inject(ServicioSrv);

  // Display columns for tables
  serviciosColumns = ['id_servicio', 'nombre', 'tipo', 'descripcion', 'estado', 'acciones'];
  proveedoresColumns = ['id_proveedor', 'nombre', 'telefono', 'email', 'direccion', 'estado', 'acciones'];
  medidoresColumns = ['id_medidor', 'numero_serie', 'tipo', 'ubicacion', 'fecha_instalacion', 'estado', 'acciones'];
  tiposReclamoColumns = ['id_tipo_reclamo', 'nombre', 'descripcion', 'acciones'];

  // Form visibility flags
  showAddServicioForm = false;
  showAddProveedorForm = false;
  showAddMedidorForm = false;
  showAddTipoReclamoForm = false;

  // New entity forms
  newServicio: Partial<Servicio> = {
    nombre: '',
    tipo: 'agua',
    descripcion: '',
    estado: 'activo'
  };

  newProveedor: Partial<ProveedorServicio> = {
    nombre: '',
    telefono: '',
    email: '',
    direccion: '',
    estado: 'activo'
  };

  newMedidor: Partial<Medidor> = {
    numero_serie: '',
    tipo: 'agua',
    ubicacion: '',
    fecha_instalacion: new Date().toISOString().split('T')[0],
    estado: 'activo'
  };

  newTipoReclamo: Partial<TipoReclamo> = {
    nombre: '',
    descripcion: ''
  };

  // Tipo de servicio options
  tiposServicio = ['agua', 'luz', 'gas'];

  ngOnInit() {
    // Data is loaded automatically in the service constructor
  }

  // ==================== SERVICIOS ====================
  toggleAddServicioForm() {
    this.showAddServicioForm = !this.showAddServicioForm;
    if (!this.showAddServicioForm) {
      this.resetServicioForm();
    }
  }

  addServicio() {
    if (this.newServicio.nombre && this.newServicio.tipo) {
      this.servicioSrv.addServicio(this.newServicio).subscribe({
        next: () => {
          this.resetServicioForm();
          this.showAddServicioForm = false;
        },
        error: (err) => console.error('Error adding servicio:', err)
      });
    }
  }

  deleteServicio(id: number) {
    if (confirm('¿Está seguro de eliminar este servicio?')) {
      this.servicioSrv.deleteServicio(id).subscribe({
        error: (err) => console.error('Error deleting servicio:', err)
      });
    }
  }

  resetServicioForm() {
    this.newServicio = {
      nombre: '',
      tipo: 'agua',
      descripcion: '',
      estado: 'activo'
    };
  }

  // ==================== PROVEEDORES ====================
  toggleAddProveedorForm() {
    this.showAddProveedorForm = !this.showAddProveedorForm;
    if (!this.showAddProveedorForm) {
      this.resetProveedorForm();
    }
  }

  addProveedor() {
    if (this.newProveedor.nombre) {
      this.servicioSrv.addProveedor(this.newProveedor).subscribe({
        next: () => {
          this.resetProveedorForm();
          this.showAddProveedorForm = false;
        },
        error: (err) => console.error('Error adding proveedor:', err)
      });
    }
  }

  deleteProveedor(id: number) {
    if (confirm('¿Está seguro de eliminar este proveedor?')) {
      this.servicioSrv.deleteProveedor(id).subscribe({
        error: (err) => console.error('Error deleting proveedor:', err)
      });
    }
  }

  resetProveedorForm() {
    this.newProveedor = {
      nombre: '',
      telefono: '',
      email: '',
      direccion: '',
      estado: 'activo'
    };
  }

  // ==================== MEDIDORES ====================
  toggleAddMedidorForm() {
    this.showAddMedidorForm = !this.showAddMedidorForm;
    if (!this.showAddMedidorForm) {
      this.resetMedidorForm();
    }
  }

  addMedidor() {
    if (this.newMedidor.numero_serie && this.newMedidor.tipo) {
      this.servicioSrv.addMedidor(this.newMedidor).subscribe({
        next: () => {
          this.resetMedidorForm();
          this.showAddMedidorForm = false;
        },
        error: (err) => console.error('Error adding medidor:', err)
      });
    }
  }

  deleteMedidor(id: number) {
    if (confirm('¿Está seguro de eliminar este medidor?')) {
      this.servicioSrv.deleteMedidor(id).subscribe({
        error: (err) => console.error('Error deleting medidor:', err)
      });
    }
  }

  resetMedidorForm() {
    this.newMedidor = {
      numero_serie: '',
      tipo: 'agua',
      ubicacion: '',
      fecha_instalacion: new Date().toISOString().split('T')[0],
      estado: 'activo'
    };
  }

  // ==================== TIPOS DE RECLAMO ====================
  toggleAddTipoReclamoForm() {
    this.showAddTipoReclamoForm = !this.showAddTipoReclamoForm;
    if (!this.showAddTipoReclamoForm) {
      this.resetTipoReclamoForm();
    }
  }

  addTipoReclamo() {
    if (this.newTipoReclamo.nombre) {
      this.servicioSrv.addTipoReclamo(this.newTipoReclamo).subscribe({
        next: () => {
          this.resetTipoReclamoForm();
          this.showAddTipoReclamoForm = false;
        },
        error: (err) => console.error('Error adding tipo reclamo:', err)
      });
    }
  }

  deleteTipoReclamo(id: number) {
    if (confirm('¿Está seguro de eliminar este tipo de reclamo?')) {
      this.servicioSrv.deleteTipoReclamo(id).subscribe({
        error: (err) => console.error('Error deleting tipo reclamo:', err)
      });
    }
  }

  resetTipoReclamoForm() {
    this.newTipoReclamo = {
      nombre: '',
      descripcion: ''
    };
  }
}
