// src/modules/admuser/superadmin.seed.ts

import { DataSource } from 'typeorm';
import { Role } from './entities/role.entity';

export const createRole = async (dataSource: DataSource) => {
  const repo = dataSource.getRepository(Role);

  // Check if roles already exist
  const existingRoles = await repo.find({
    where: [
      { name: 'SuperAdmin' },
      { name: 'Manager' },
      { name: 'Maker' },
      { name: 'Checker' },
      { name: 'Viewer' },
    ],
  });
  if (existingRoles.length > 0) {
    console.log('✅ Roles already exist.');
    return;
  }

  await repo.save([
    { name: 'SuperAdmin' },
    { name: 'Manager' },
    { name: 'Maker' },
    { name: 'Checker' },
    { name: 'Viewer' },
  ]);
  console.log('✅ Roles created: SuperAdmin, Manager, Maker, Checker, Viewer');
};
