import {
  Spectator,
  createComponentFactory,
  mockProvider,
  SpyObject,
  createSpyObject,
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
    dataService.isInstalled().subscribe(console.log);
    spectator.detectChanges();
    const element = spectator.query<HTMLInputElement>(byTestId('checkbox'));
    expect(element?.checked).toBeTruthy();
  });

  it('be true', () => {
    dataService.isInstalled.mockReturnValue(of(false));
    spectator.detectChanges();
    expect(spectator.component.$manual()).toBeFalsy();
  });

  it('be true', () => {
    dataService.isInstalled.mockReturnValue(of(true));
    spectator.detectChanges();
    expect(spectator.component.$manual()).toBeTruthy();
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
  });

  it('should the checked be false', () => {
    spectator.detectChanges();
    const element = spectator.query<HTMLInputElement>(byTestId('checkbox'));
    expect(element?.checked).toBeFalsy();
  });
});
