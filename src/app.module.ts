import { JwtModule } from '@nestjs/jwt';
import { WsJwtGuard } from './common/guards/ws-jwt.guard';
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
import { JwtStrategy } from './strategies/jwt.strategy';
import { EventsModule } from './modules/events/events.module';
import { AdmUserModule } from './modules/admuser/admuser.module';
import { PermissionModule } from './modules/permissions/permission.module';
import { RoleModule } from './modules/roles/role.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppDataSource } from './config/typeorm.config';

@Module({
  imports: [
    JwtModule.register({
      secret: 'mysecretkey', // TODO: Use ConfigService in production
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      ...ConfigModules,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (): TypeOrmModuleOptions => AppDataSource.options,
    }),
    AuthModule,
    RoleModule,
    AdmUserModule,
    PermissionModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    LoggerService,
    CacheCleanupService,
    ShutdownService,
    EnvConfigService,
    EventsModule,
    JwtStrategy,
    WsJwtGuard,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
