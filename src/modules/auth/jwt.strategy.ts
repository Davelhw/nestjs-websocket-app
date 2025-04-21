import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

type JwtPayload = {
  sub: number;
  username: string;
};

type JwtValidatedUser = {
  userId: number;
  username: string;
};

const extractToken = (request: Request): string | null => {
  if ('handshake' in request) {
    const socketRequest = request as unknown as {
      handshake?: { query?: { token?: string } };
    };
    return socketRequest.handshake?.query?.token ?? null;
  }

  const authHeader = request.headers?.authorization;
  return authHeader?.startsWith('Bearer ')
    ? authHeader.replace('Bearer ', '')
    : null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([extractToken]),
      ignoreExpiration: false,
      secretOrKey: 'mysecretkey',
    });
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async validate(payload: JwtPayload): Promise<JwtValidatedUser> {
    return {
      userId: payload.sub,
      username: payload.username,
    };
  }
}
