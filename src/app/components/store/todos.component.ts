import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodosStore } from './todos.store';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [],
  template: `<ul>
    @for (todo of store.todos(); track todo.id) {
      {{ todo.title }}
    }
    <button type="button" (click)="addNewTodo()">add todo</button>
  </ul>`,
  providers: [ TodosStore ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosComponent {

  readonly store = inject(TodosStore);

  addNewTodo() {
    this.store.addTodo({
      id: '1',
      title: 'New todo',
      completed: false
    });
  }

}
