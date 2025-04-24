// auth/guards/permissions.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from 'src/common/decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) return true;

    const { user } = context.switchToHttp().getRequest();

    const userPermissions: string[] =
      user?.roles?.flatMap(
        (role: { permissions?: { module: string; action: string }[] }) =>
          role.permissions?.map(
            (perm: { module: string; action: string }) =>
              `${perm.module}:${perm.action}`,
          ) ?? [],
      ) ?? [];

    return requiredPermissions.every((p) => userPermissions.includes(p));
  }
}
