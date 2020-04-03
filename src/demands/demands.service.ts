import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Demand } from './demand.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class DemandsService extends TypeOrmCrudService<Demand> {
  constructor(
    @InjectRepository(Demand)
    private readonly repository: Repository<Demand>,
  ) {
    super(repository);
  }
}
