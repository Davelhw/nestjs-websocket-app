// src/config/swagger.config.ts

import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication, environment: string): void {
  const config = new DocumentBuilder()
    .setTitle('Nestjs RBAC API')
    .setDescription('API documentation for the RBAC backend')
    .setVersion('1.0')
    .addBearerAuth() // Enable Bearer Token authentication
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
      defaultModelsExpandDepth: -1,
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
    },
    customSiteTitle: `RBAC Admin API Docs (${environment})`,
  });
}
