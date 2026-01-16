import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
  private todos = [
    { id: 1, title: 'Learn NestJS', completed: false },
    { id: 2, title: 'Build Todo API', completed: true },
  ];

  private idCounter = 3;

  findAll(search?: string) {
    if (!search) return this.todos;

    return this.todos.filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase()),
    );
  }

  create(dto: CreateTodoDto) {
    const todo = {
      id: this.idCounter++,
      title: dto.title,
      completed: false,
    };

    this.todos.push(todo);
    return todo;
  }

  toggle(id: number) {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    todo.completed = !todo.completed;
    return todo;
  }

  remove(id: number) {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException('Todo not found');
    }

    const deleted = this.todos[index];
    this.todos.splice(index, 1);
    return deleted;
  }
}
