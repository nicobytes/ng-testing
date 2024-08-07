import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleComponent } from './people.component';
import { PersonComponent } from './../person/person.component';
import { By } from '@angular/platform-browser';
import { getText, query, queryById } from './../../../testing';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopleComponent, PersonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list app-person components', () => {
    const debugElement = fixture.debugElement.queryAll(By.css('app-person'));
    expect(debugElement.length).toEqual(component.people.length);
  });

  it('should raise selected event when clicked', () => {
    // const button  = fixture.debugElement.query(By.css('app-person .btn-person'));
    const buttonDe = query(
      fixture,
      'app-person button[data-testid="btn-person"]',
    );
    buttonDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.selectedPerson).toEqual(component.people[0]);
  });

  it('should render person when do click', () => {
    const buttonDe = query(
      fixture,
      'app-person button[data-testid="btn-person"]',
    );
    buttonDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    // const liDe = fixture.debugElement.query(By.css('.selectedPerson ul > li'));
    const liDe = query(fixture, '.selectedPerson ul > li');
    expect(component.selectedPerson).toEqual(component.people[0]);
    expect(liDe.nativeElement.textContent).toContain(
      component.selectedPerson.name,
    );
  });
});
