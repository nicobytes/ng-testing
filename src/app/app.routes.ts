import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SignalsComponent } from './components/signals/signals.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'signals/:id',
    component: SignalsComponent,
  },
];
