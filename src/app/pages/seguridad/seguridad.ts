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
import { SeguridadSrv } from '../../core/services/seguridad';
import { 
  Patrullaje,
  Camara,
  IncidenteSeguridad,
  Denuncia,
  AgenteSeguridad
} from '../../core/models';

@Component({
  selector: 'app-seguridad',
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
  templateUrl: './seguridad.html',
  styleUrl: './seguridad.scss',
})
export class Seguridad implements OnInit {

  seguridadSrv = inject(SeguridadSrv);

  // Display columns for tables
  patrullajesColumns = ['id_patrullaje', 'fecha', 'zona', 'hora_inicio', 'hora_fin', 'direccion', 'estado', 'acciones'];
  camarasColumns = ['id_camara', 'direccion', 'resolucion', 'fecha_instalacion', 'estado', 'acciones'];
  incidentesColumns = ['id_incidente_seg', 'fecha', 'hora', 'descripcion', 'estado', 'acciones'];
  denunciasColumns = ['id_denuncia', 'hora', 'descripcion', 'evidencia_url', 'estado', 'acciones'];
  agentesColumns = ['id_agente', 'nombre', 'apellido', 'ci', 'placa', 'telefono', 'estado', 'acciones'];

  // Form visibility flags
  showAddPatrullajeForm = false;
  showAddCamaraForm = false;
  showAddIncidenteForm = false;
  showAddDenunciaForm = false;
  showAddAgenteForm = false;

  // New entity forms
  newPatrullaje: Partial<Patrullaje> = {
    fecha: new Date().toISOString().split('T')[0],
    hora_inicio: '',
    hora_fin: '',
    zona: '',
    latitud_inicio: 0,
    longitud_inicio: 0,
    latitud_fin: 0,
    longitud_fin: 0,
    direccion: '',
    estado: 'activo'
  };

  newCamara: Partial<Camara> = {
    latitud: 0,
    longitud: 0,
    direccion: '',
    resolucion: '1080p',
    fecha_instalacion: new Date().toISOString().split('T')[0],
    estado: 'activo'
  };

  newIncidente: Partial<IncidenteSeguridad> = {
    descripcion: '',
    fecha: new Date().toISOString().split('T')[0],
    hora: '',
    latitud: 0,
    longitud: 0,
    estado: 'pendiente'
  };

  newDenuncia: Partial<Denuncia> = {
    descripcion: '',
    hora: '',
    evidencia_url: '',
    estado: 'pendiente'
  };

  newAgente: Partial<AgenteSeguridad> = {
    nombre: '',
    apellido: '',
    ci: '',
    placa: '',
    telefono: '',
    estado: 'activo'
  };

  // Options
  resolucionesCamara = ['720p', '1080p', '4K', '8K'];
  estadosIncidente = ['pendiente', 'en_proceso', 'resuelto', 'cerrado'];
  estadosDenuncia = ['pendiente', 'en_revision', 'investigando', 'cerrado'];

  ngOnInit() {
    // Data will be loaded when endpoints are available
  }

  // ==================== PATRULLAJES ====================
  toggleAddPatrullajeForm() {
    this.showAddPatrullajeForm = !this.showAddPatrullajeForm;
    if (!this.showAddPatrullajeForm) {
      this.resetPatrullajeForm();
    }
  }

  addPatrullaje() {
    if (this.newPatrullaje.fecha && this.newPatrullaje.zona) {
      this.seguridadSrv.addPatrullaje(this.newPatrullaje).subscribe({
        next: () => {
          this.resetPatrullajeForm();
          this.showAddPatrullajeForm = false;
        },
        error: (err) => console.error('Error adding patrullaje:', err)
      });
    }
  }

  deletePatrullaje(id: number) {
    if (confirm('¿Está seguro de eliminar este patrullaje?')) {
      this.seguridadSrv.deletePatrullaje(id).subscribe({
        error: (err) => console.error('Error deleting patrullaje:', err)
      });
    }
  }

  resetPatrullajeForm() {
    this.newPatrullaje = {
      fecha: new Date().toISOString().split('T')[0],
      hora_inicio: '',
      hora_fin: '',
      zona: '',
      latitud_inicio: 0,
      longitud_inicio: 0,
      latitud_fin: 0,
      longitud_fin: 0,
      direccion: '',
      estado: 'activo'
    };
  }

  // ==================== CÁMARAS ====================
  toggleAddCamaraForm() {
    this.showAddCamaraForm = !this.showAddCamaraForm;
    if (!this.showAddCamaraForm) {
      this.resetCamaraForm();
    }
  }

  addCamara() {
    if (this.newCamara.direccion) {
      this.seguridadSrv.addCamara(this.newCamara).subscribe({
        next: () => {
          this.resetCamaraForm();
          this.showAddCamaraForm = false;
        },
        error: (err) => console.error('Error adding camara:', err)
      });
    }
  }

  deleteCamara(id: number) {
    if (confirm('¿Está seguro de eliminar esta cámara?')) {
      this.seguridadSrv.deleteCamara(id).subscribe({
        error: (err) => console.error('Error deleting camara:', err)
      });
    }
  }

  resetCamaraForm() {
    this.newCamara = {
      latitud: 0,
      longitud: 0,
      direccion: '',
      resolucion: '1080p',
      fecha_instalacion: new Date().toISOString().split('T')[0],
      estado: 'activo'
    };
  }

  // ==================== INCIDENTES DE SEGURIDAD ====================
  toggleAddIncidenteForm() {
    this.showAddIncidenteForm = !this.showAddIncidenteForm;
    if (!this.showAddIncidenteForm) {
      this.resetIncidenteForm();
    }
  }

  addIncidente() {
    if (this.newIncidente.descripcion) {
      this.seguridadSrv.addIncidenteSeguridad(this.newIncidente).subscribe({
        next: () => {
          this.resetIncidenteForm();
          this.showAddIncidenteForm = false;
        },
        error: (err) => console.error('Error adding incidente:', err)
      });
    }
  }

  deleteIncidente(id: number) {
    if (confirm('¿Está seguro de eliminar este incidente?')) {
      this.seguridadSrv.deleteIncidenteSeguridad(id).subscribe({
        error: (err) => console.error('Error deleting incidente:', err)
      });
    }
  }

  resetIncidenteForm() {
    this.newIncidente = {
      descripcion: '',
      fecha: new Date().toISOString().split('T')[0],
      hora: '',
      latitud: 0,
      longitud: 0,
      estado: 'pendiente'
    };
  }

  // ==================== DENUNCIAS ====================
  toggleAddDenunciaForm() {
    this.showAddDenunciaForm = !this.showAddDenunciaForm;
    if (!this.showAddDenunciaForm) {
      this.resetDenunciaForm();
    }
  }

  addDenuncia() {
    if (this.newDenuncia.descripcion) {
      this.seguridadSrv.addDenuncia(this.newDenuncia).subscribe({
        next: () => {
          this.resetDenunciaForm();
          this.showAddDenunciaForm = false;
        },
        error: (err) => console.error('Error adding denuncia:', err)
      });
    }
  }

  deleteDenuncia(id: number) {
    if (confirm('¿Está seguro de eliminar esta denuncia?')) {
      this.seguridadSrv.deleteDenuncia(id).subscribe({
        error: (err) => console.error('Error deleting denuncia:', err)
      });
    }
  }

  resetDenunciaForm() {
    this.newDenuncia = {
      descripcion: '',
      hora: '',
      evidencia_url: '',
      estado: 'pendiente'
    };
  }

  // ==================== AGENTES DE SEGURIDAD ====================
  toggleAddAgenteForm() {
    this.showAddAgenteForm = !this.showAddAgenteForm;
    if (!this.showAddAgenteForm) {
      this.resetAgenteForm();
    }
  }

  addAgente() {
    if (this.newAgente.nombre && this.newAgente.apellido && this.newAgente.ci) {
      this.seguridadSrv.addAgenteSeguridad(this.newAgente).subscribe({
        next: () => {
          this.resetAgenteForm();
          this.showAddAgenteForm = false;
        },
        error: (err) => console.error('Error adding agente:', err)
      });
    }
  }

  deleteAgente(id: number) {
    if (confirm('¿Está seguro de eliminar este agente?')) {
      this.seguridadSrv.deleteAgenteSeguridad(id).subscribe({
        error: (err) => console.error('Error deleting agente:', err)
      });
    }
  }

  resetAgenteForm() {
    this.newAgente = {
      nombre: '',
      apellido: '',
      ci: '',
      placa: '',
      telefono: '',
      estado: 'activo'
    };
  }
}
