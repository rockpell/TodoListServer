import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
};

describe('TodoService', () => {
  let service: TodoService;
  let todoRepository: MockRepository<Todo>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getRepositoryToken(Todo),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
    todoRepository = module.get(getRepositoryToken(Todo));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create todo test', async () => {
    const createTodoDto: CreateTodoDto = {
      content: 'init content',
      is_check: false,
    };
    const todo = await service.create(createTodoDto);

    expect(todoRepository.save).toHaveBeenCalledTimes(1);
    expect(todoRepository.save).toHaveBeenCalledWith(createTodoDto);

    // expect(todo.content).toEqual(createTodoDto);
  });
});
