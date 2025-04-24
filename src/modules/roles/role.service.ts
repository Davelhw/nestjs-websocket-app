import { Injectable } from '@nestjs/common';
import { RoleEntity } from './entities/role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService {
  constructor(
    // Inject any required dependencies here, e.g., repositories or services
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    // private readonly someOtherService: SomeOtherService,
  ) {}
}
