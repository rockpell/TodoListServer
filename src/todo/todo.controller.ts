import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    const todo = await this.todoService.create(createTodoDto);

    return { msg: '생성 성공', todo };
  }

  @Get()
  async findAll() {
    const todoList = await this.todoService.findAll();

    return { count: todoList.length, todoList: todoList };
  }

  @Post('/:id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    const todo = this.todoService.update(+id, updateTodoDto);

    return { msg: '수정 성공', todo };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const todo = await this.todoService.findOne(+id);
    if (!todo) {
      return { msg: '삭제 실패' };
    }
    await this.todoService.remove(+id);

    return { msg: '삭제 성공', todo };
  }
}
