import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([]), // Add your entities here
  ],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
