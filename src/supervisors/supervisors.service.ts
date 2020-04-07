import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '../core/crud.service';
import { Supervisor } from './supervisor.entity';

@Injectable()
export class SupervisorsService extends TypeOrmCrudService<Supervisor> {
  constructor(
    @InjectRepository(Supervisor)
    private readonly repository: Repository<Supervisor>,
  ) {
    super(repository);
  }
}
