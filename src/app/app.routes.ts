import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SignalsComponent } from './components/signals/signals.component';
import { ButtonComponent } from './components/button/button.component';
import { TodosComponent } from './components/store/todos.component';
import { ParentComponent } from './components/inputs/parent.component';
import { DiagnosticsComponent } from './components/diagnostics/diagnostics.component';
import { ToSingalComponent } from './components/to-singal/to-singal.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'signals/:id',
    component: SignalsComponent,
  },
  {
    path: 'button',
    component: ButtonComponent,
  },
  {
    path: 'todos',
    component: TodosComponent,
  },
  {
    path: 'inputs',
    component: ParentComponent,
  },
  {
    path: 'diagnostics',
    component: DiagnosticsComponent,
  },
  {
    path: 'to-singal',
    component: ToSingalComponent,
  },
];
