import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import * as winston from 'winston';
// const { combine, printf, timestamp, prettyPrint, errors } = winston.format;
// import { Logger } from './common/logger';

async function bootstrap() {
  // const logger = winston.createLogger({
  //   level: 'info',
  //   //format: winston.format.json(),
  //   format: combine(
  //     timestamp(),
  //     //printf((info) => `${info.timestamp} ${info.level} : ${info.message}`),
  //     prettyPrint(),
  //   ),
  //   transports: [
  //     new winston.transports.Console(),
  //     new winston.transports.File({ filename: 'app.log' }),
  //   ],
  // });

  // logger.info('An info log');
  // logger.error('An error log', new Error('504 Gateway timeout'));

  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.enableCors();

  /**
   * The DocumentBuilder helps to structure a base document that conforms to the OpenAPI Specification.
   */
  const configDoc = new DocumentBuilder()
    .setTitle('Todo Api')
    .setDescription('A very simple API')
    .setVersion('1.0')
    .build();
  /**
   * create a full document (with all HTTP routes defined) we use the createDocument()
   */
  const document = SwaggerModule.createDocument(app, configDoc);
  /**
   * The path to mount the Swagger UI, An application instance,  The document object instantiated above
   */
  SwaggerModule.setup('docs', app, document);

  await app.listen(3030);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
