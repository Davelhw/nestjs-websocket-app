// src/modules/auth/decorators/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

/**
 * Apply this decorator to secure routes with role-based access.
 * Example: @Roles('admin'), @Roles('admin', 'moderator')
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
