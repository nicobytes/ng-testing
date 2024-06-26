import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { queryAllByDirective, queryAll } from '../../../testing';

import { HighlightDirective } from './highlight.directive';

@Component({
    template: `
    <h5 class="title" appHighlight>default</h5>
    <h5 appHighlight="yellow">yellow</h5>
    <p appHighlight="blue">parrafo</p>
    <p>otro parrafo</p>
    <input [(ngModel)]="color" [appHighlight]="color">
  `,
    standalone: true,
    imports: [FormsModule]
})
class HostComponent {
  color = 'pink';
}

xdescribe('HighlightDirective', () => {

  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [FormsModule, HostComponent, HighlightDirective]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have three highlight elements', () => {
    // const elements = fixture.debugElement.queryAll(By.directive(HighlightDirective));
    const elements = queryAllByDirective(fixture, HighlightDirective);
    // const elementsWithout = fixture.debugElement.queryAll(By.css('*:not([highlight])'));
    const elementsWithout = queryAll(fixture, '*:not([highlight])');
    expect(elements.length).toEqual(4);
    expect(elementsWithout.length).toEqual(2);
  });

  it('should the elements be match with bgColor', () => {
    const elements = fixture.debugElement.queryAll(By.directive(HighlightDirective));
    expect(elements[0].nativeElement.style.backgroundColor).toEqual('gray');
    expect(elements[1].nativeElement.style.backgroundColor).toEqual('yellow');
    expect(elements[2].nativeElement.style.backgroundColor).toEqual('blue');
  });

  it('should the h5.title be defaultColor', () => {
    const titleDe = fixture.debugElement.query(By.css('.title'));
    const dir = titleDe.injector.get(HighlightDirective);
    expect(titleDe.nativeElement.style.backgroundColor).toEqual(dir.defaultColor);
  });

  it('should bind <input> and change the bgColor', () => {
    const inputDe = fixture.debugElement.query(By.css('input'));
    const inputEl: HTMLInputElement = inputDe.nativeElement;

    expect(inputEl.style.backgroundColor).toEqual('pink');

    inputEl.value = 'red';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputEl.style.backgroundColor).toEqual('red');
    expect(component.color).toEqual('red');
  });
});
