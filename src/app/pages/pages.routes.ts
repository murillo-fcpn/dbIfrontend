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
    },
    {
        path: 'seguridad',
        title: 'Seguridad',
        loadComponent: () => import('./seguridad/seguridad').then((comp) => comp.Seguridad),
    },
    {
        path: 'medio-ambiente',
        title: 'Medio Ambiente',
        loadComponent: () => import('./medio-ambiente/medio-ambiente').then((comp) => comp.MedioAmbiente),
    },
    {
        path: 'usuarios',
        title: 'Usuarios',
        loadComponent: () => import('./usuarios/usuarios').then((comp) => comp.Usuarios),
    },
    {
        path: 'movilidad',
        title: 'Movilidad',
        loadComponent: () => import('./movilidad/movilidad').then((comp) => comp.Movilidad),
    },
]