import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});

  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(`Server started on Port ${process.env.PORT ?? 3000}`)
  });
}
bootstrap();
