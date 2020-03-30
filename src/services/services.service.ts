import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './service.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class ServicesService extends TypeOrmCrudService<Service> {
  constructor(
    @InjectRepository(Service)
    private readonly repository: Repository<Service>,
  ) {
    super(repository);
  }
}
