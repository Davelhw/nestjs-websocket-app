// permissions/permission.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Role } from 'src/modules/roles/entities/role.entity';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  module: string; // e.g., 'finance', 'users', 'dashboard'

  @Column()
  action: string; // e.g., 'view', 'create', 'edit', 'approve', 'delete'

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
