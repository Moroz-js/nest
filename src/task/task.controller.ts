import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { createTaskDto } from './dto/CreateTask.dto';
import { UpdateTaskDto } from './dto/UpdateTask.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Get()
  async findAll() {
    return this.taskService.findAll()
  }

  @Get(":id")
  async findById(@Param('id') id: string) {
    return this.taskService.findById(+id)
  }
  @Post("/create")
  create(@Body() createTaskDto: createTaskDto) {
    return this.taskService.create(createTaskDto)
  }
  @Put("/update/:id")
  update(@Param("id") id: string, @Body() UpdateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, UpdateTaskDto)
  }

}
