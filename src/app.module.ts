import {
  Module,
  MiddlewareConsumer,
  RequestMethod,
  NestModule,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { Task } from './task/entity/task.entity';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { LoggerService } from './common/services/logger.service';
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
      entities: [Task],
      synchronize: true,
      retryAttempts: 0,
      //autoLoadEntities: true
    }),
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService, LoggerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
