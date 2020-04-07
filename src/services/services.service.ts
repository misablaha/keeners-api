import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '../core/crud.service';
import { Service } from './service.entity';

@Injectable()
export class ServicesService extends TypeOrmCrudService<Service> {
  constructor(
    @InjectRepository(Service)
    private readonly repository: Repository<Service>,
  ) {
    super(repository);
  }
}
