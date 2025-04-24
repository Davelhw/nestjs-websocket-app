import { Module } from '@nestjs/common';
import { AdmUserService } from './admuser.service';
import { AdmUserController } from './admuser.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdmUserEntity } from './entities/admuser.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdmUserEntity]), // Import the AdmUser entity
  ],
  providers: [AdmUserService],
  controllers: [AdmUserController],
  exports: [AdmUserService],
})
export class AdmUserModule {}
