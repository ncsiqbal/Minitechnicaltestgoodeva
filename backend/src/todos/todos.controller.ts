import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('api/todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  getTodos(@Query('search') search?: string) {
    return this.todosService.findAll(search);
  }

  @Post()
  createTodo(@Body() body: CreateTodoDto) {
    return this.todosService.create(body);
  }

  @Patch(':id')
  toggleTodo(@Param('id') id: string) {
    const result = this.todosService.toggle(Number(id));

    if (!result) {
      throw new NotFoundException('Todo not found');
    }

    return result;
  }
}
