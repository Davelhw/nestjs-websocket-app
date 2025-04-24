// roles/role.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { AdmUserEntity } from 'src/modules/admuser/entities/admuser.entity';
import { PermissionEntity } from 'src/modules/permissions/entities/permission.entity';

@Entity('roles')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => AdmUserEntity, (admuser) => admuser.roles)
  admUsers: AdmUserEntity[];

  @ManyToMany(() => PermissionEntity, (permission) => permission.roles)
  @JoinTable()
  permissions: PermissionEntity[];
}
