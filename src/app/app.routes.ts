import { Routes } from '@angular/router';
import { routesPages } from './pages/pages.routes';

export const routes: Routes = [
    {
        path: '',
        title: 'Home',
        loadComponent: () => import('./pages/pages').then((m) => m.Pages),
        children: routesPages
    }
];
