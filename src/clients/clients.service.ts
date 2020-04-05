import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Client } from './client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { CrudRequest } from '@nestjsx/crud';

const createRequest = (): CrudRequest => ({
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  parsed: {
    fields: [],
    paramsFilter: [],
    search: { $and: [{}] },
    filter: [],
    or: [],
    join: [],
    sort: [],
  },
  options: {
    query: { alwaysPaginate: false },
    routes: {
      getManyBase: { interceptors: [], decorators: [] },
      getOneBase: { interceptors: [], decorators: [] },
      createOneBase: { interceptors: [], decorators: [], returnShallow: false },
      createManyBase: { interceptors: [], decorators: [] },
      updateOneBase: { interceptors: [], decorators: [], allowParamsOverride: false, returnShallow: false },
      replaceOneBase: { interceptors: [], decorators: [], allowParamsOverride: false, returnShallow: false },
      deleteOneBase: { interceptors: [], decorators: [], returnDeleted: false },
    },
    params: { id: { field: 'id', type: 'uuid', primary: true } },
  },
});

const updateRequest = (id: string): CrudRequest => ({
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  parsed: {
    fields: [],
    paramsFilter: [{ field: 'id', operator: '$eq', value: id }],
    search: { $and: [{ id: { $eq: id } }, {}] },
    filter: [],
    or: [],
    join: [],
    sort: [],
  },
  options: {
    query: { alwaysPaginate: false },
    routes: {
      getManyBase: { interceptors: [], decorators: [] },
      getOneBase: { interceptors: [], decorators: [] },
      createOneBase: { interceptors: [], decorators: [], returnShallow: false },
      createManyBase: { interceptors: [], decorators: [] },
      updateOneBase: { interceptors: [], decorators: [], allowParamsOverride: false, returnShallow: false },
      replaceOneBase: { interceptors: [], decorators: [], allowParamsOverride: false, returnShallow: false },
      deleteOneBase: { interceptors: [], decorators: [], returnDeleted: false },
    },
    params: { id: { field: 'id', type: 'uuid', primary: true } },
  },
});

@Injectable()
export class ClientsService extends TypeOrmCrudService<Client> {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {
    super(clientRepository);
  }

  public async updateOneOrCreate(id: string | undefined | null, dto: CreateClientDto | UpdateClientDto) {
    if (id) {
      return this.updateOne(updateRequest(id), dto);
    } else {
      return this.createOne(createRequest(), dto);
    }
  }
}
