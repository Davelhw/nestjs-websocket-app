import { EventsGateway } from './events/events.gateway';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './modules/auth/jwt.strategy';
import { WsJwtGuard } from './modules/auth/ws-jwt.guard';
import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerService } from './common/services/logger.service';
import { LoggingMiddleware } from './common/interceptors/logger.middleware';
import { CacheCleanupService } from './common/services/cache-cleanup.service';
import { ShutdownService } from './common/services/shutdown.service';
import { EnvConfigService } from './common/services/config.service';
import { ConfigModules } from './config/modules.config';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/roles/role.module';
import { PermissionModule } from './modules/permissions/permission.module';
import { PeoplDbModule } from './database/external/people-db.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'mysecretkey', // TODO: Use ConfigService in production
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      ...ConfigModules,
    }),
    PeoplDbModule,
    AuthModule,
    RoleModule,
    PermissionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    LoggerService,
    CacheCleanupService,
    ShutdownService,
    EnvConfigService,
    EventsGateway,
    JwtStrategy,
    WsJwtGuard,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
