import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
