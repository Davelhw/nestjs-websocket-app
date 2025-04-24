import { Module } from '@nestjs/common';
import { AdmUserService } from './admuser.service';
import { AdmuserController } from './admuser.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdmUser } from './entities/admuser.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdmUser]), // Import the AdmUser entity
  ],
  providers: [AdmUserService],
  controllers: [AdmuserController],
  exports: [AdmUserService],
})
export class AdmUserModule {}
