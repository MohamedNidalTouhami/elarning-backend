import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  if (process.env.NODE_ENV === 'production') {
    return await app.listen('8080');
  }

  await app.listen(process.env.PORT ?? 5500);
}
bootstrap();
