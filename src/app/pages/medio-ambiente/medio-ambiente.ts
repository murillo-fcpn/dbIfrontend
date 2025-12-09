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
import { MedioAmbienteSrv } from '../../core/services/medio-ambiente';
import { 
  Sensor,
  LecturaSensor,
  AlertaAmbiental,
  Zona
} from '../../core/models';

@Component({
  selector: 'app-medio-ambiente',
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
  templateUrl: './medio-ambiente.html',
  styleUrl: './medio-ambiente.scss',
})
export class MedioAmbiente implements OnInit {

  medioAmbienteSrv = inject(MedioAmbienteSrv);

  // Display columns for tables
  sensoresColumns = ['id_sensor', 'codigo', 'tipo', 'ubicacion', 'fecha_instalacion', 'estado', 'acciones'];
  lecturasColumns = ['id_lectura_sensor', 'fecha', 'hora', 'tipo_lectura', 'valor', 'unidad_medida', 'acciones'];
  alertasColumns = ['id_alerta', 'fecha', 'hora', 'tipo_alerta', 'descripcion', 'estado', 'acciones'];
  zonasColumns = ['id_zona', 'nombre', 'tipo', 'descripcion', 'acciones'];

  // Form visibility flags
  showAddSensorForm = false;
  showAddLecturaForm = false;
  showAddAlertaForm = false;
  showAddZonaForm = false;

  // New entity forms
  newSensor: Partial<Sensor> = {
    codigo: '',
    tipo: 'temperatura',
    ubicacion: '',
    latitud: 0,
    longitud: 0,
    fecha_instalacion: new Date().toISOString().split('T')[0],
    estado: 'activo'
  };

  newLectura: Partial<LecturaSensor> = {
    valor: 0,
    unidad_medida: '',
    fecha: new Date().toISOString().split('T')[0],
    hora: '',
    tipo_lectura: 'manual'
  };

  newAlerta: Partial<AlertaAmbiental> = {
    fecha: new Date().toISOString().split('T')[0],
    hora: '',
    tipo_alerta: 'contaminacion',
    descripcion: '',
    estado: 'activa'
  };

  newZona: Partial<Zona> = {
    nombre: '',
    poligono_geojson: '',
    descripcion: '',
    tipo: 'residencial'
  };

  // Options
  tiposSensor = ['ruido', 'aire', 'temperatura', 'humedad'];
  tiposLectura = ['manual', 'automatica'];
  tiposAlerta = ['contaminacion', 'ruido', 'temperatura', 'calidad_aire'];
  tiposZona = ['residencial', 'industrial', 'verde'];

  ngOnInit() {
    // Data is loaded automatically in the service constructor
  }

  // ==================== SENSORES ====================
  toggleAddSensorForm() {
    this.showAddSensorForm = !this.showAddSensorForm;
    if (!this.showAddSensorForm) {
      this.resetSensorForm();
    }
  }

  addSensor() {
    if (this.newSensor.codigo && this.newSensor.tipo) {
      this.medioAmbienteSrv.addSensor(this.newSensor).subscribe({
        next: () => {
          this.resetSensorForm();
          this.showAddSensorForm = false;
        },
        error: (err) => console.error('Error adding sensor:', err)
      });
    }
  }

  deleteSensor(id: number) {
    if (confirm('¿Está seguro de eliminar este sensor?')) {
      this.medioAmbienteSrv.deleteSensor(id).subscribe({
        error: (err) => console.error('Error deleting sensor:', err)
      });
    }
  }

  resetSensorForm() {
    this.newSensor = {
      codigo: '',
      tipo: 'temperatura',
      ubicacion: '',
      latitud: 0,
      longitud: 0,
      fecha_instalacion: new Date().toISOString().split('T')[0],
      estado: 'activo'
    };
  }

  // ==================== LECTURAS DE SENSOR ====================
  toggleAddLecturaForm() {
    this.showAddLecturaForm = !this.showAddLecturaForm;
    if (!this.showAddLecturaForm) {
      this.resetLecturaForm();
    }
  }

  addLectura() {
    if (this.newLectura.valor !== undefined) {
      this.medioAmbienteSrv.addLecturaSensor(this.newLectura).subscribe({
        next: () => {
          this.resetLecturaForm();
          this.showAddLecturaForm = false;
        },
        error: (err) => console.error('Error adding lectura:', err)
      });
    }
  }

  deleteLectura(id: number) {
    if (confirm('¿Está seguro de eliminar esta lectura?')) {
      this.medioAmbienteSrv.deleteLecturaSensor(id).subscribe({
        error: (err) => console.error('Error deleting lectura:', err)
      });
    }
  }

  resetLecturaForm() {
    this.newLectura = {
      valor: 0,
      unidad_medida: '',
      fecha: new Date().toISOString().split('T')[0],
      hora: '',
      tipo_lectura: 'manual'
    };
  }

  // ==================== ALERTAS AMBIENTALES ====================
  toggleAddAlertaForm() {
    this.showAddAlertaForm = !this.showAddAlertaForm;
    if (!this.showAddAlertaForm) {
      this.resetAlertaForm();
    }
  }

  addAlerta() {
    if (this.newAlerta.descripcion) {
      this.medioAmbienteSrv.addAlertaAmbiental(this.newAlerta).subscribe({
        next: () => {
          this.resetAlertaForm();
          this.showAddAlertaForm = false;
        },
        error: (err) => console.error('Error adding alerta:', err)
      });
    }
  }

  deleteAlerta(id: number) {
    if (confirm('¿Está seguro de eliminar esta alerta?')) {
      this.medioAmbienteSrv.deleteAlertaAmbiental(id).subscribe({
        error: (err) => console.error('Error deleting alerta:', err)
      });
    }
  }

  resetAlertaForm() {
    this.newAlerta = {
      fecha: new Date().toISOString().split('T')[0],
      hora: '',
      tipo_alerta: 'contaminacion',
      descripcion: '',
      estado: 'activa'
    };
  }

  // ==================== ZONAS ====================
  toggleAddZonaForm() {
    this.showAddZonaForm = !this.showAddZonaForm;
    if (!this.showAddZonaForm) {
      this.resetZonaForm();
    }
  }

  addZona() {
    if (this.newZona.nombre) {
      this.medioAmbienteSrv.addZona(this.newZona).subscribe({
        next: () => {
          this.resetZonaForm();
          this.showAddZonaForm = false;
        },
        error: (err) => console.error('Error adding zona:', err)
      });
    }
  }

  deleteZona(id: number) {
    if (confirm('¿Está seguro de eliminar esta zona?')) {
      this.medioAmbienteSrv.deleteZona(id).subscribe({
        error: (err) => console.error('Error deleting zona:', err)
      });
    }
  }

  resetZonaForm() {
    this.newZona = {
      nombre: '',
      poligono_geojson: '',
      descripcion: '',
      tipo: 'residencial'
    };
  }
}
