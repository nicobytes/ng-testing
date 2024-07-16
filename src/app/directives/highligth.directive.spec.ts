import {
  createDirectiveFactory,
  createHostFactory,
  SpectatorDirective,
  SpectatorHost
} from '@ngneat/spectator/jest';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HighlightDirective } from './highlight.directive';

describe('HighlightDirective', () => {
  let spectator: SpectatorDirective<HighlightDirective>;
  const createDirective = createDirectiveFactory(HighlightDirective);

  beforeEach(() => {
    spectator = createDirective(`<p appHighlight="blue">parrafo</p>`);
  });

  it('should create', () => {
    expect(spectator.directive).toBeDefined();
  });
});

@Component({
  template: `
    <h5 class="title" appHighlight>default</h5>
    <h5 appHighlight="yellow">yellow</h5>
    <p appHighlight="blue">parrafo</p>
    <p>otro parrafo</p>
    <input [(ngModel)]="color" [appHighlight]="color" />
  `,
  standalone: true,
  selector: 'app-dummy',
  imports: [FormsModule, HighlightDirective],
})
class DummyComponent {
  color = 'pink';
}

describe('HighlightDirective with Host', () => {
  let spectator: SpectatorHost<DummyComponent>;
  const createHost = createHostFactory(DummyComponent);

  beforeEach(async () => {
    spectator = createHost(`<app-dummy/>`);
  });

  it('should have 4 highlight elements', () => {
    const elements = spectator.queryAll(HighlightDirective);
    expect(elements.length).toEqual(4);
  });

  it('should the elements be match with bgColor', () => {
    const elements = spectator.debugElement.queryAll(By.directive(HighlightDirective));
    expect(elements[0].nativeElement.style.backgroundColor).toEqual('gray');
    expect(elements[1].nativeElement.style.backgroundColor).toEqual('yellow');
    expect(elements[2].nativeElement.style.backgroundColor).toEqual('blue');
  });

  it('should the h5.title be defaultColor', () => {
    const titleDe = spectator.debugElement.query(By.css('.title'));
    const dir = titleDe.injector.get(HighlightDirective);
    expect(titleDe.nativeElement.style.backgroundColor).toEqual(
      dir.defaultColor,
    );
  });

  it('should bind <input> and change the bgColor', () => {
    const inputDe = spectator.debugElement.query(By.css('input'));
    const inputEl: HTMLInputElement = inputDe.nativeElement;

    expect(inputEl.style.backgroundColor).toEqual('pink');

    inputEl.value = 'red';
    inputEl.dispatchEvent(new Event('input'));
    spectator.detectChanges();

    expect(inputEl.style.backgroundColor).toEqual('red');
  });
});