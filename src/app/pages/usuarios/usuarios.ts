import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
export class Usuarios implements OnInit {
  usersSrv = inject(UsersSrv);
  
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
    direccion: ''
  };

  ngOnInit() {
    this.loadAllData();
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
      direccion: ''
    };
  }
}
