import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])], // Add your Role entity here if you have one
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
