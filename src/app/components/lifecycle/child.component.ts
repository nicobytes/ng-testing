import { Component } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  template: `
    <div>
      <p>Child</p>
      <p>Child</p>
      <p>Child</p>
      <p>Child</p>
      <p>Child</p>
    </div>
  `,
})
export class ChildComponent {}
