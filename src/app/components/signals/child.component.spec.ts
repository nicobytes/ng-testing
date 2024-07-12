import {
  Spectator,
  createComponentFactory
} from '@ngneat/spectator/jest';

import { ChildComponent } from './child.component';

describe('ChildComponent', () => {
  let spectator: Spectator<ChildComponent>;

  const createComponent = createComponentFactory({
    component: ChildComponent,
  });

  beforeEach(() => {
    spectator = createComponent({
      detectChanges: false
    });
    spectator.setInput('number', 1);
  });

  it('should create', () => {
    spectator.detectChanges();
    expect(spectator.component).toBeTruthy();
  });
});