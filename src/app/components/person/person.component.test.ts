import { DebugElement, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Person } from '../../models/person';
import { getText, queryById, clickEvent } from '../../../testing';

import { PersonComponent } from './person.component';
import { first } from 'rxjs/operators';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, PersonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    component.person = new Person('Nicolas', 'Molina', 28, 68, 1.65);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should the name be 'nicolas'", () => {
    expect(component.person.name).toEqual('Nicolas');
  });

  it('should have <h3> with person name', () => {
    const expectMsg = `Hola, ${component.person.name}`;
    // const h3Debug = debugElement.query(By.css('h3'));
    // const h3: HTMLElement = h3Debug.nativeElement;
    // expect(h3).not.toBeNull();

    const titleText = getText(fixture, 'title');
    expect(titleText).toEqual(expectMsg);
  });

  it('should have <p> with person height', () => {
    const expectMsg = `Mi altura es ${component.person.height}`;
    // const pDebug = debugElement.query(By.css('p'));
    // const p: HTMLElement = pDebug.nativeElement;
    // expect(p).not.toBeNull();
    const pText = getText(fixture, 'text');
    expect(pText).toEqual(expectMsg);
  });

  it('should display a different height', () => {
    // Arrange
    component.person.height = 999;
    const expectMsg = `Mi altura es ${component.person.height}`;
    // Act
    fixture.detectChanges();
    const pText = getText(fixture, 'text');
    // Assert
    expect(pText).toEqual(expectMsg);
  });

  it('should have <h3> contain  person name', () => {
    // Arrange
    const expectName = 'Valentina';
    component.person.name = expectName;
    // const h3: HTMLElement = debugElement.query(By.css('h3')).nativeElement;
    // Act
    fixture.detectChanges();
    const titleText = getText(fixture, 'title');
    // Assert
    expect(titleText).toContain(expectName);
  });

  it('should display a text with IMC', () => {
    // Arrange
    // component.person.height = 999;
    const expectText = 'overweight';
    // const button = debugElement.query(By.css('.btn-imc')).nativeElement;
    // Act
    component.calcIMC();
    fixture.detectChanges();
    const btnText = getText(fixture, 'btn-imc');
    // Assert
    expect(btnText).toContain(expectText);
  });

  it('should display un text with IMC with click', () => {
    // Arrange
    const expectText = 'overweight';
    // Act
    clickEvent(fixture, 'btn-imc', true);
    fixture.detectChanges();
    // Assert
    const textBtn = getText(fixture, 'btn-imc');
    expect(textBtn).toContain(expectText);
  });

  it('should raise selected event when clicked', () => {
    // Arrange
    const expectedPerson = new Person('Nicolas', 'Molina', 28, 68, 1.65);
    // const buttonDe = debugElement.query(By.css('.btn-person'));
    const buttonDe = queryById(fixture, 'btn-person');

    let selectedPerson: Person | undefined;
    component.selected.pipe(first()).subscribe((person: Person) => {
      selectedPerson = person;
    });
    // Act
    component.person = expectedPerson;
    buttonDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    // Assert
    expect(selectedPerson).toEqual(expectedPerson);
  });
});

@Component({
  template: ` <app-person [person]="person" (selected)="onSelected($event)">
  </app-person>`,
  standalone: true,
})
class TestHostComponent {
  person: Person = new Person('Nicolas', 'Molina', 28, 68, 1.65);
  selectedPerson: Person | undefined;
  onSelected(person: Person) {
    this.selectedPerson = person;
  }
}

describe('PersonComponent from HostComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, PersonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display person name', () => {
    const expectedName = component.person.name;
    const titleText = getText(fixture, 'title');
    expect(titleText).toContain(expectedName);
  });

  it('should raise selected event when clicked', () => {
    const btnDe = queryById(fixture, 'btn-person');
    btnDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.selectedPerson).toEqual(component.person);
  });
});
