import {
  Spectator,
  createComponentFactory,
  createSpyObject,
} from '@ngneat/spectator/jest';

import { TodosComponent } from './todos.component';
import { TodosStore } from './todos.store';
import { byTestId, mockProvider, SpyObject } from '@ngneat/spectator';
import { By } from '@angular/platform-browser';

describe('TodosComponent', () => {
  let spectator: Spectator<TodosComponent>;
  let store: SpyObject<InstanceType<typeof TodosStore>>;
  const staore = createSpyObject(TodosStore);

  const createComponent = createComponentFactory({
    component: TodosComponent,
    componentProviders: [
      TodosStore
    ]
  });

  beforeEach(() => {
    spectator = createComponent({
      detectChanges: false
    });
    store = spectator.inject(TodosStore, true);
  });

  it('should create', () => {
    spectator.detectChanges();
    expect(spectator.component).toBeTruthy();
  });
});