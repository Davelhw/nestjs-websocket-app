// src/config/swagger.config.ts

import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication, environment: string): void {
  const config = new DocumentBuilder()
    .setTitle('People Tap Game API')
    .setDescription('API documentation for the People Tap Game project')
    .setVersion('1.0')
    .addBearerAuth() // Enable Bearer Token authentication
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: `RBAC Admin API Docs (${environment})`,
  });
}
