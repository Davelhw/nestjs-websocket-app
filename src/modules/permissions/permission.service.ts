import { Injectable } from '@nestjs/common';
import { PermissionEntity } from './entities/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionRepo: Repository<PermissionEntity>,
  ) {}

  async createPermission(
    module: string,
    action: string,
  ): Promise<PermissionEntity> {
    const permission = this.permissionRepo.create({ module, action });
    return this.permissionRepo.save(permission);
  }

  async findAll(): Promise<PermissionEntity[]> {
    return this.permissionRepo.find();
  }

  async findByModuleAndAction(
    module: string,
    action: string,
  ): Promise<PermissionEntity | undefined> {
    const result = await this.permissionRepo.findOne({
      where: { module, action },
    });
    return result ?? undefined;
  }

  async findById(id: number): Promise<PermissionEntity | null> {
    return this.permissionRepo.findOne({ where: { id: id.toString() } });
  }

  async create(
    permission: Partial<PermissionEntity>,
  ): Promise<PermissionEntity> {
    const newPermission = this.permissionRepo.create(permission);
    return this.permissionRepo.save(newPermission);
  }

  async update(
    id: number,
    updates: Partial<PermissionEntity>,
  ): Promise<PermissionEntity> {
    await this.permissionRepo.update(id, updates);
    const updatedPermission = await this.findById(id);
    if (!updatedPermission) {
      throw new Error(`Permission with ID ${id} not found`);
    }
    return updatedPermission;
  }

  async delete(id: number): Promise<void> {
    await this.permissionRepo.delete(id);
  }
}
