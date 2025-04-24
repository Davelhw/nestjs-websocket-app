import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdmUserEntity } from './entities/admuser.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdmUserService {
  constructor(
    @InjectRepository(AdmUserEntity)
    private readonly userRepo: Repository<AdmUserEntity>,
  ) {}

  async findByUsername(username: string): Promise<AdmUserEntity | null> {
    return this.userRepo.findOne({ where: { username } });
  }

  async findById(id: string): Promise<AdmUserEntity | null> {
    return this.userRepo.findOne({ where: { id } });
  }

  async save(user: AdmUserEntity): Promise<AdmUserEntity> {
    return this.userRepo.save(user);
  }
}
