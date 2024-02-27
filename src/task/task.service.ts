import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entity/task.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  getTask(id) {
    return this.taskRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  getAllTasks() {
    //return 'TOUTES LES TÂCHES !!';
    return this.taskRepository.find();
  }

  async createTask(body: CreateTaskDTO) {
    /**
     * On crée d'abord un objet task puis nous sauvegardons la donnée dans la database
     */
    //console.log(body);
    const isTaskAlreadyExist = await this.taskRepository.findOneBy({
      title: body.title,
    });
    if (isTaskAlreadyExist) {
      throw new NotFoundException('This task already exist.');
    }
    const task = this.taskRepository.create(body);
    //console.log(task);
    return this.taskRepository.save(task);
  }

  async deleteTask(id: number) {
    //console.log(this.taskRepository.delete(id));
    return this.taskRepository.delete(id);
  }

  async updateTask(id: number, body: UpdateTaskDTO) {
    //console.log(await this.taskRepository.update(id, body));
    return await this.taskRepository.update(id, body);
  }
}
