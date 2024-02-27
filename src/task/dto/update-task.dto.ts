import { PartialType } from '@nestjs/swagger';
//import { IsNotEmpty, IsString } from 'class-validator';
import { CreateTaskDTO } from './create-task.dto';

export class UpdateTaskDTO extends PartialType(CreateTaskDTO) {}
