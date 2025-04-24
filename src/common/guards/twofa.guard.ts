// src/modules/auth/guards/twofa.guard.ts

import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class TwoFAGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) return false;

    if (user.twoFAEnabled && !user.twoFAVerified) {
      throw new ForbiddenException('2FA is required and not verified');
    }

    return true;
  }
}
