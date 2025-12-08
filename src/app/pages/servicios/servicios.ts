import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ServicioSrv } from '../../core/services/servicio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-servicios',
  imports: [
    CommonModule,
    MatTableModule,
    MatTabsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './servicios.html',
  styleUrl: './servicios.scss',
})
export class Servicios {

  #servicioSrv = inject(ServicioSrv);
  servicios = this.#servicioSrv.servicios;

  loading = signal<boolean>(false);
  error = signal<string | null>(null);



}
