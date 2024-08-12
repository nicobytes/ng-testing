import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SignalsComponent } from './components/signals/signals.component';
import { ButtonComponent } from './components/button/button.component';
import { TodosComponent } from './components/store/todos.component';
import { ParentComponent } from './components/inputs/parent.component';

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
];
