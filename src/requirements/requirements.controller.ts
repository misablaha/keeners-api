import { Controller } from '@nestjs/common';
import { CreateRequirementDto } from './dto/create-requirement.dto';
import { Requirement } from './requirement.entity';
import { RequirementsService } from './requirements.service';
import { UpdateRequirementDto } from './dto/update-requirement.dto';
import { Crud, CrudController } from '@nestjsx/crud';

@Controller('api/requirements')
@Crud({
  model: { type: Requirement },
  dto: {
    create: CreateRequirementDto,
    update: UpdateRequirementDto,
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  query: {
    join: {
      helper: {
        eager: true,
      },
      client: {
        eager: true,
      },
      supervisor: {
        eager: true,
      },
      demands: {
        eager: true,
      },
    },
  },
})
export class RequirementsController implements CrudController<Requirement> {
  constructor(public readonly service: RequirementsService) {}
}
