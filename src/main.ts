import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './utils/filters/bad-request';
import { InterceptorResponse } from './utils/filters/interceptor-response';
import { ResultExceptionFilter } from './utils/filters/result-request';
import { Queue_ } from './infra/queue/queue';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new ResultExceptionFilter());
  app.useGlobalInterceptors(new InterceptorResponse());



  await app.listen(3000);
}
bootstrap();
