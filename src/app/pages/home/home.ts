import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, DatePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  date = new Date();
}
