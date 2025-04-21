import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { WsJwtGuard } from './ws-jwt.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: 'mysecretkey',
    }),
  ],
  providers: [JwtStrategy, WsJwtGuard, JwtAuthGuard, AuthService],
  controllers: [AuthController],
  exports: [JwtModule, WsJwtGuard, JwtAuthGuard, AuthService],
})
export class AuthModule {}
