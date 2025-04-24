import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { RoleEntity } from 'src/modules/roles/entities/role.entity';
import { AdmUserEntity } from 'src/modules/admuser/entities/admuser.entity';
import { PermissionEntity } from 'src/modules/permissions/entities/permission.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  //entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  entities: [PermissionEntity, RoleEntity, AdmUserEntity],
  synchronize: false,
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
});
