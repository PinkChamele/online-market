import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import AppModule from './app/app.module';
import COMMON_CONSTANTS from './common/constants';
import AllExceptionsFilter from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('port') || COMMON_CONSTANTS.SERVER_PORT;
  const options = new DocumentBuilder()
    .setTitle('Api v1')
    .setVersion('1.0')
    .addBearerAuth({ in: 'header', type: 'http' })
    .build();

  app.enableVersioning();
  app.useGlobalFilters(new AllExceptionsFilter());

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);
  await app.listen(port);
}
bootstrap();
