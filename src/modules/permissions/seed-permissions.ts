import { DataSource } from 'typeorm';
import { Permission } from './entities/permission.entity';

export const seedPermissions = async (dataSource: DataSource) => {
  const permissionRepo = dataSource.getRepository(Permission);

  const permissions = [
    { module: 'users', action: 'view' },
    { module: 'users', action: 'edit' },
    { module: 'finance', action: 'approve' },
    { module: 'finance', action: 'create' },
    { module: 'dashboard', action: 'view' },
  ];

  for (const perm of permissions) {
    const exists = await permissionRepo.findOne({ where: perm });
    if (!exists) {
      await permissionRepo.save(perm);
    }
  }

  console.log('✅ Permissions seeded');
};
