import {
  Controller,
  Delete,
  Get,
  Put,
  Post,
  Body,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { TaskService } from './task.service';
/*import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity'*/
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAllTask() {
    //console.log(this.taskService.getAllTasks());
    // return this.taskService.getAllTasks();

    const tasks = await this.taskService.getAllTasks();
    if (!tasks || tasks.length === 0) {
      throw new NotFoundException('Aucune tâche trouvée.');
    }
    return tasks;
  }

  @Post()
  @ApiCreatedResponse({ description: 'Task creation' })
  createTask(@Body() body: CreateTaskDTO) {
    return this.taskService.createTask(body);
  }

  @Put(':id')
  async updateTask(@Param('id') id: number, @Body() body: UpdateTaskDTO) {
    const isTaskExist = await this.taskService.getTask(id);
    if (!isTaskExist) {
      throw new NotFoundException('Aucune tâche trouvée.');
    }
    return await this.taskService.updateTask(id, body);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number) {
    //console.log(typeof params.id)
    //const taskToDelete = this.taskService.getTask(id)
    //console.log(taskToDelete);
    this.taskService.deleteTask(id);
  }

  @Get(':id')
  async findTask(@Param('id') id: number) {
    //console.log(this.taskService.getTask(id)); // Promise { <pending> } //le resultat ne vient pas
    const task = await this.taskService.getTask(id);
    if (!task) {
      throw new NotFoundException('Customer does not exist!');
    }
    return task;
  }
}
