import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { Task } from './task/entity/task.entity';
//import { HelloController } from './task/hello/hello.controller';

/* Ajouter les entités dans le tableau  */

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'quasar_todo_app',
      /**
       * TypeORM utilise les classes spécifiées dans le tableau entities pour créer une correspondance entre ces entités
       * et les tables de la base de données. Une fois que les entités sont liées aux tables de la base de données, vous
       * pouvez utiliser les méthodes fournies par TypeORM pour effectuer des opérations CRUD .
       */
      entities: [Task],

      /**
       * Cette option n'est pas utile en mode production. En mode production, nous ferons recours aux migrations
       */
      synchronize: true,
      retryAttempts: 0,
      //autoLoadEntities: true
    }),
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
