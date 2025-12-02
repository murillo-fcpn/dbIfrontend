import { Routes } from '@angular/router';

export const routesPages: Routes = [
    {
        path: '',
        title: 'Home',
        loadComponent: () => import('./home/home').then((comp) => comp.Home),
    },
    {
        path: 'servicios',
        title: 'Servicios',
        loadComponent: () => import('./servicios/servicios').then((comp) => comp.Servicios),
    }
]