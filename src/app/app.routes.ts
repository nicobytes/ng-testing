import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PeopleComponent } from './components/people/people.component';
import { OthersComponent } from './components/others/others.component';
import { SignalsComponent } from './components/signals/signals.component';
import { HostListenerComponent } from './components/host-listener/host-listener.component';
import { ResizeObserverComponent } from './components/resize-observer/resize-observer.component';

import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'pico',
    loadComponent: () =>
      import('./components/pico-preview/pico-preview.component'),
  },
  {
    path: 'lifecycle',
    loadComponent: () => import('./components/lifecycle/parent.component'),
  },
  {
    path: 'signals/:id',
    component: SignalsComponent,
  },
  {
    path: 'resize',
    component: HostListenerComponent,
  },
  {
    path: 'resize-observer',
    component: ResizeObserverComponent,
  },
];
