// src/config/config.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  AppConfigType,
  AdmDatabaseConfigType,
  JwtConfigType,
} from 'src/common/interfaces/config.type.interface';

@Injectable()
export class EnvConfigService {
  constructor(private readonly config: ConfigService) {}

  get app(): AppConfigType {
    return {
      app_port: this.config.get<number>('APP_PORT', 9960),

      app_environment: this.config.get<string>('NODE_ENV', 'development'),

      app_corsWhitelist: this.config
        .get<string>('CORS_WHITELIST', '')
        .split(',')
        .map((x) => x.trim())
        .filter(Boolean),
    };
  }

  get database(): AdmDatabaseConfigType {
    return {
      db_host: this.config.getOrThrow<string>('DB_HOST'),
      db_port: this.config.getOrThrow<number>('DB_PORT'),
      db_username: this.config.getOrThrow<string>('DB_USERNAME'),
      db_password: this.config.getOrThrow<string>('DB_PASSWORD'),
      db_database: this.config.getOrThrow<string>('DB_NAME'),
    };
  }

  get jwt(): JwtConfigType {
    return {
      secret: this.config.getOrThrow<string>('JWT_SECRET'),
      expiresIn: this.config.get<string>('JWT_EXPIRES_IN', '4h'),
      refreshExpiresIn: this.config.get<string>('JWT_REFRESH_EXPIRES_IN', '6h'),
    };
  }
}
