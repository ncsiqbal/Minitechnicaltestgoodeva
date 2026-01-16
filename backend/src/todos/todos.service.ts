import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

@Injectable()
export class TodosService {
  private todos: Todo[] = [
    { id: 1, title: 'Learn NestJS', completed: false },
    { id: 2, title: 'Build Todo API', completed: true },
  ];

  private nextId = 3;

  findAll(search?: string): Todo[] {
    if (!search) return this.todos;

    const q = search.trim().toLowerCase();
    if (!q) return this.todos;

    return this.todos.filter((t) =>
      t.title.toLowerCase().includes(q),
    );
  }

  create(dto: CreateTodoDto): Todo {
    const todo: Todo = {
      id: this.nextId++,
      title: dto.title,
      completed: false,
    };

    this.todos.push(todo);
    return todo;
  }

  toggle(id: number): Todo | null {
    const todo = this.todos.find((t) => t.id === id);

    if (!todo) return null;

    todo.completed = !todo.completed;
    return todo;
  }
}
