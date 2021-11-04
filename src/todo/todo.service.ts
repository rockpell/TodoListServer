import { Todo } from './entities/todo.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    createTodoDto.is_check = false;
    return await this.todoRepository.save(createTodoDto);
  }

  async findOne(id: number): Promise<Todo> {
    return await this.todoRepository.findOne(id);
  }

  async findAll(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = this.editTodo(id, updateTodoDto);
    return todo;
  }

  async editTodo(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    await this.todoRepository.update(id, updateTodoDto);
    const todo = await this.todoRepository.findOne(id);
    return todo;
  }

  async remove(id: number) {
    await this.todoRepository.delete(id);
  }
}
