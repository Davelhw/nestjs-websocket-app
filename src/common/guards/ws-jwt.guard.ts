import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

interface JwtPayload {
  sub: number;
  username: string;
}

interface AuthenticatedSocket extends Socket {
  user?: JwtPayload;
}

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const client = context.switchToWs().getClient<AuthenticatedSocket>();

    // Ensure query param is a string
    const rawToken = client.handshake?.query?.token;
    const token = Array.isArray(rawToken) ? rawToken[0] : rawToken;

    if (!token || typeof token !== 'string') {
      return false;
    }

    try {
      const payload = this.jwtService.verify<JwtPayload>(token, {
        secret: 'mysecretkey',
      });
      client.user = payload; // assign user to socket safely
      return true;
    } catch {
      return false;
    }
  }
}
