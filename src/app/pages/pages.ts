import { Component } from '@angular/core';
import { Menu } from '../component/menu/menu';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pages',
  imports: [Menu, RouterModule],
  templateUrl: './pages.html',
  styleUrl: './pages.scss',
})
export class Pages {

}
