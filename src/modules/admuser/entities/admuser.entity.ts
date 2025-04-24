// src/modules/admuser/entities/admuser.entity.ts

import { Role } from 'src/modules/roles/entities/role.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('adm_users')
export class AdmUser {
  @PrimaryGeneratedColumn('uuid') // 👈 change here
  id: string;

  @Column({ unique: true, nullable: false, type: 'varchar', length: 255 })
  username: string;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  passwordHash: string;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  nickname: string;

  // @Column({ default: '', nullable: false, type: 'varchar', length: 800 })
  // roles: string;

  @Column({ default: false })
  twoFAEnabled: boolean;

  @Column({ default: false })
  twoFAVerified: boolean;

  @Column({ unique: true, nullable: true, type: 'varchar', length: 255 })
  twoFASecret?: string | null;

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];
}
