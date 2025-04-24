import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionEntity } from './entities/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionEntity])], // Import any other modules if needed
  providers: [PermissionService],
  exports: [PermissionService], // Export the PermissionsService if needed in other modules
})
export class PermissionModule {}
