import { Controller, Delete, Param, Put } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Helper } from './helper.entity';
import { HelpersService } from './helpers.service';
import { CreateHelperDto } from './dto/create-helper.dto';
import { UpdateHelperDto } from './dto/update-helper.dto';

@Controller('api/helpers')
@Crud({
  model: { type: Helper },
  dto: {
    create: CreateHelperDto,
    update: UpdateHelperDto,
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
      provide: {
        eager: true,
      },
    },
  },
})
export class HelpersController implements CrudController<Helper> {
  constructor(public readonly service: HelpersService) {}

  @Put(':id/services/:sid')
  addService(@Param('id') hid: string, @Param('sid') sid: string): Promise<Helper> {
    return this.service.addService(hid, sid);
  }

  @Delete(':id/services/:sid')
  removeService(@Param('id') hid: string, @Param('sid') sid: string): Promise<Helper> {
    return this.service.removeService(hid, sid);
  }
}
