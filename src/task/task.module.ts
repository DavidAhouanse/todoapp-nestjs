import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

//Les modules servent à regrouper les outils d'une même ressource, ici Task par exp

@Module({
  /** Nest cree un referentiel de Task, a travers la methode, en arrière plan qui sera injecter dans TaskService. Ce
   * module utilise la methode forFeature() pour définir quels référentiels sont enregistrés dans la portée actuelle. Une
   * fois cela en place, nous pouvons injecter le UsersRepository dans UsersService à l'aide du decorateur @InjectRepository().
   * L'étape suivante consiste à connecter notre entité au module parent. Cela obligera Nest à créer un référentiel en coulisses.
   */
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskService],
  //providers: [TaskService]
})
export class TaskModule {}
