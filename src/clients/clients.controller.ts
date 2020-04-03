import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Client } from './client.entity';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('api/clients')
@Crud({
  model: { type: Client },
  dto: {
    create: CreateClientDto,
    update: UpdateClientDto,
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
})
export class ClientsController implements CrudController<Client> {
  constructor(public readonly service: ClientsService) {}
}
