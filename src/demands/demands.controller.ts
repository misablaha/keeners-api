import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { CreateDemandDto } from './dto/create-demand.dto';
import { UpdateDemandDto } from './dto/update-demand.dto';
import { DemandsService } from './demands.service';
import { Demand } from './demand.entity';

@Controller('api/requirements/:requirementId/demands')
@Crud({
  model: { type: Demand },
  dto: {
    create: CreateDemandDto,
    update: UpdateDemandDto,
  },
  params: {
    requirementId: {
      field: 'requirementId',
      type: 'uuid',
    },
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  query: {
    join: {
      service: {
        eager: true,
      },
    },
  },
})
export class DemandsController implements CrudController<Demand> {
  constructor(public readonly service: DemandsService) {}
}
