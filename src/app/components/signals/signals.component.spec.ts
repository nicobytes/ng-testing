import {
  Spectator,
  createComponentFactory,
  mockProvider,
  SpyObject,
  byTestId,
} from '@ngneat/spectator/jest';

import { SignalsComponent } from './signals.component';
import { DataService } from '@services/data.service';
import { of } from 'rxjs';

describe('SignalsComponent', () => {
  let spectator: Spectator<SignalsComponent>;
  let dataService: SpyObject<DataService>;

  const createComponent = createComponentFactory({
    component: SignalsComponent,
    componentProviders: [
      mockProvider(DataService, {
        isInstalled: jest.fn().mockReturnValue(of(true)),
      }),
    ],
  });

  beforeEach(() => {
    spectator = createComponent({
      detectChanges: false,
    });
    spectator.setInput('status', 'loading');
    dataService = spectator.inject(DataService, true);
  });

  it('should create', () => {
    spectator.detectChanges();
    expect(spectator.component).toBeTruthy();
  });

  it('should isInstalled been called', () => {
    spectator.detectChanges();
    expect(dataService.isInstalled).toHaveBeenCalled();
  });

  it('should the checked be true', () => {
    spectator.detectChanges();
    const element = spectator.query<HTMLInputElement>(byTestId('checkbox'));
    expect(element?.checked).toBeTruthy();
  });
  
  // TODO: be false
  it('be true', () => {
    dataService.isInstalled.mockReturnValue(of(false));
    spectator.detectChanges();
    expect(spectator.component.$manual()).toBeTruthy();
  });

  it('output', () => {
    const spyEmit = jest.spyOn(spectator.component.onEvent, 'emit');
    spectator.detectChanges();
    const btn = byTestId('btn-emit');
    spectator.click(btn);
    expect(spyEmit).toHaveBeenCalledWith('event');
  });
});

describe('SignalsComponent with false', () => {
  let spectator: Spectator<SignalsComponent>;
  let dataService: SpyObject<DataService>;

  const createComponent = createComponentFactory({
    component: SignalsComponent,
    componentProviders: [
      mockProvider(DataService, {
        isInstalled: jest.fn().mockReturnValue(of(false)),
      }),
    ],
  });

  beforeEach(() => {
    spectator = createComponent({
      detectChanges: false,
    });
    dataService = spectator.inject(DataService, true);
    spectator.setInput('status', 'loading');
  });

  it('should the checked be false', () => {
    spectator.detectChanges();
    const element = spectator.query<HTMLInputElement>(byTestId('checkbox'));
    expect(element?.checked).toBeFalsy();
  });
});
