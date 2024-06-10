import { Routes } from '@angular/router';

import { PeopleComponent } from './components/people/people.component';
import { PicoPreviewComponent } from './components/pico-preview/pico-preview.component';
import { OthersComponent } from './components/others/others.component';

import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'pico-preview',
        component: PicoPreviewComponent
    },
    {
        path: 'people',
        component: PeopleComponent
    },
    {
        path: 'others',
        canActivate: [AuthGuard],
        component: OthersComponent
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then(m => m.routes)
    },
    {
        path: 'products',
        loadChildren: () => import('./products/products-routing.module').then(m => m.routes)
    }
];
