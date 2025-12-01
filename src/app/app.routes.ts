import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        title: 'Home',
        loadComponent: () => import('./pages/pages').then((m) => m.Pages),
        children: []
    }
];
