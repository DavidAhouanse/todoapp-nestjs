import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  //retourne un objet dans la constance app
  const app = await NestFactory.create(AppModule, {
    abortOnError: false, // renvoie une erreur lors de la creation de l'app
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
   * The path to mount the Swagger UI
   * An application instance
   * The document object instantiated above
   */
  SwaggerModule.setup('docs', app, document);

  await app.listen(3030);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
