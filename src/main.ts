import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './common/services/swagger.config';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { LoggerService } from './common/services/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  const logger = app.get(LoggerService);
  app.useLogger(logger);

  // Use global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());

  // Set global API prefix
  app.useWebSocketAdapter(new IoAdapter(app));
  app.setGlobalPrefix('api');

  const env = process.env.NODE_ENV || 'development';
  setupSwagger(app, env);

  const port = process.env.APP_PORT || 9960;
  await app.listen(port);
  logger.log(`🚀 App running on http://localhost:${port}`);
}
bootstrap().catch((err) => {
  console.error('Error during application bootstrap:', err);
});
