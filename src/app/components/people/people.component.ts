import { Component, OnInit } from '@angular/core';

import { Person } from './../../models/person';
import { PersonComponent } from '../person/person.component';


@Component({
    selector: 'app-people',
    templateUrl: './people.component.html',
    styleUrls: ['./people.component.scss'],
    standalone: true,
    imports: [PersonComponent]
})
export class PeopleComponent  {

  people: Person[] = [
    new Person('Nicolas', 'Molina', 28, 68, 1.70),
    new Person('Valentina', 'Molina', 13, 40, 1.60),
  ];
  selectedPerson!: Person;

  constructor() { }

  onSelect(person: Person){
    this.selectedPerson = person;
  }

}
