// src/modules/auth/strategies/jwt.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

export interface JwtPayload {
  sub: string;
  username: string;
  roles: string[];
  twoFAEnabled: boolean;
  twoFAVerified: boolean;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        configService.get<string>('JWT_SECRET') ||
        'cb60e06ec6480d6ce85cb40480d58d3e506e08be03c1645d603867e655397cbd',
    });
  }

  validate(payload: JwtPayload) {
    // This becomes request.user
    return {
      userId: payload.sub,
      username: payload.username,
      roles: payload.roles,
      twoFAEnabled: payload.twoFAEnabled,
      twoFAVerified: payload.twoFAVerified,
    };
  }
}
