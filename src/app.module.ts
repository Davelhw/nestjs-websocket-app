import { Module } from '@nestjs/common';
import { EventsGateway } from './events/events.gateway';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './modules/auth/jwt.strategy';
import { WsJwtGuard } from './modules/auth/ws-jwt.guard';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'mysecretkey', // TODO: Use ConfigService in production
    }),
    AuthModule,
  ],
  providers: [EventsGateway, JwtStrategy, WsJwtGuard],
})
export class AppModule {}
