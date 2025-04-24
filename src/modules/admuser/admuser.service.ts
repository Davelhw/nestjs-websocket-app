import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdmUser } from './entities/admuser.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdmUserService {
  constructor(
    @InjectRepository(AdmUser)
    private readonly userRepo: Repository<AdmUser>,
  ) {}

  async findByUsername(username: string): Promise<AdmUser | null> {
    return this.userRepo.findOne({ where: { username } });
  }

  async findById(id: string): Promise<AdmUser | null> {
    return this.userRepo.findOne({ where: { id } });
  }

  async save(user: AdmUser): Promise<AdmUser> {
    return this.userRepo.save(user);
  }
}
