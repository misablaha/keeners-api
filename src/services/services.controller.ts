import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { CreateServiceDto } from './dto/create-service.dto';
import { Service } from './service.entity';
import { ServicesService } from './services.service';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('api/services')
@Crud({
  model: { type: Service },
  dto: {
    create: CreateServiceDto,
    update: UpdateServiceDto,
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
})
export class ServicesController implements CrudController<Service> {
  constructor(public readonly service: ServicesService) {}
}
