import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepo: Repository<Permission>,
  ) {}

  async createPermission(module: string, action: string): Promise<Permission> {
    const permission = this.permissionRepo.create({ module, action });
    return this.permissionRepo.save(permission);
  }

  async findAll(): Promise<Permission[]> {
    return this.permissionRepo.find();
  }

  async findByModuleAndAction(
    module: string,
    action: string,
  ): Promise<Permission | undefined> {
    const result = await this.permissionRepo.findOne({
      where: { module, action },
    });
    return result ?? undefined;
  }
}
