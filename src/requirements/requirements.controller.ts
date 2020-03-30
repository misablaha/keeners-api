import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateRequirementDto } from './dto/create-requirement.dto';
import { Requirement } from './requirement.entity';
import { RequirementsService } from './requirements.service';
import { UpdateRequirementDto } from './dto/update-requirement.dto';

@Controller('api/requirements')
export class RequirementsController {
  constructor(private readonly requirementsService: RequirementsService) {}

  @Put()
  create(@Body() data: CreateRequirementDto): Promise<Requirement> {
    return this.requirementsService.create(data);
  }

  @Get()
  findAll(): Promise<Requirement[]> {
    return this.requirementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Requirement> {
    return this.requirementsService.findOne(id);
  }

  @Post(':id')
  updateOne(@Param('id') id: string, @Body() data: UpdateRequirementDto): Promise<Requirement> {
    return this.requirementsService.updateOne(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.requirementsService.remove(id);
  }
}
