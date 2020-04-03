import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class ClientsService extends TypeOrmCrudService<Client> {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {
    super(clientRepository);
  }
}
