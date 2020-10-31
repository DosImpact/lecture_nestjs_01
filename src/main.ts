import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // @가 붙은 type만 허용
      forbidNonWhitelisted: true, // @가 붙은 key 외의 데이터가 들어오면 애러
      transform: true, // param의 string 을 number로
    }),
  );
  await app.listen(4000);
}
bootstrap();
