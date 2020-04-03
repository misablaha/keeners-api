import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SupervisorsService } from './supervisors.service';
import { Supervisor } from './supervisor.entity';
import { CreateSupervisorDto } from './dto/create-supervisor.dto';
import { UpdateSupervisorDto } from './dto/update-supervisor.dto';

@Controller('api/supervisors')
@Crud({
  model: { type: Supervisor },
  dto: {
    create: CreateSupervisorDto,
    update: UpdateSupervisorDto,
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
})
export class SupervisorsController implements CrudController<Supervisor> {
  constructor(public readonly service: SupervisorsService) {}
}
