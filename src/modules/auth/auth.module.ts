import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { WsJwtGuard } from '../../common/guards/ws-jwt.guard';
import { JwtStrategy } from '../../strategies/jwt.strategy';
import { RolesGuard } from '../../common/guards/roles.guard';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { TwoFAGuard } from '../../common/guards/twofa.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: 'mysecretkey',
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    JwtGuard,
    PermissionsGuard,
    RolesGuard,
    TwoFAGuard,
    WsJwtGuard,
  ],
  controllers: [AuthController],
  exports: [JwtModule, WsJwtGuard, JwtGuard, AuthService],
})
export class AuthModule {}
