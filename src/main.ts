import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: { credentials: true, origin: true },
    });

    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.use(cookieParser());

    await app.listen(3000);
}
bootstrap();
