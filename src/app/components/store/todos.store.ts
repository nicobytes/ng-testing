import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type Todo = {
    id: string;
    title: string;
    completed: boolean;
}

type TodosState = {
  todos: Todo[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: TodosState = {
  todos: [],
  isLoading: false,
  filter: { query: '', order: 'asc' },
};

export const TodosStore = signalStore(
  withState(initialState),
  withMethods((store) => ({
    addTodo: (newTodo: Todo) => {
        patchState(store, {
            todos: [...store.todos(), newTodo],
        });
    },
  })),
);