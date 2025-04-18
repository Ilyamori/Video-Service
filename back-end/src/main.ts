import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = NestFactory.create(AppModule);

    (await app).enableCors();
    (await app).setGlobalPrefix('api');

    (await app).listen(4200);
}

bootstrap();
