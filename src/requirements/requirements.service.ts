import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { CreateRequirementDto } from './dto/create-requirement.dto';
import { UpdateRequirementDto } from './dto/update-requirement.dto';
import { Requirement } from './requirement.entity';
import { Client } from '../clients/client.entity';
import { Supervisor } from '../supervisors/supervisor.entity';
import { Helper } from '../helpers/helper.entity';
import { DemandsService } from '../demands/demands.service';
import { ClientsService } from '../clients/clients.service';

@Injectable()
export class RequirementsService extends TypeOrmCrudService<Requirement> {
  constructor(
    @InjectRepository(Helper)
    private readonly helperRepository: Repository<Helper>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Requirement)
    private readonly requirementRepository: Repository<Requirement>,
    @InjectRepository(Supervisor)
    private readonly supervisorRepository: Repository<Supervisor>,
    private readonly demandsService: DemandsService,
    private readonly clientsService: ClientsService,
  ) {
    super(requirementRepository);
  }

  async createOne(req: CrudRequest, dto: CreateRequirementDto): Promise<Requirement> {
    const client = await this.clientsService.updateOneOrCreate(dto.clientId, dto.client);
    const supervisor = await this.supervisorRepository.findOne(dto.supervisorId);
    const helper = dto.helperId ? await this.supervisorRepository.findOne(dto.helperId) : undefined;

    const result = await super.createOne(req, { ...dto, client, supervisor, helper });
    if (dto.demands) {
      result.demands = await this.demandsService.syncDemands(result.id, dto.demands);
    }

    return result;
  }

  async updateOne(req: CrudRequest, dto: UpdateRequirementDto): Promise<Requirement> {
    const supervisor = await this.supervisorRepository.findOne(dto.supervisorId);
    const helper = dto.helperId ? await this.supervisorRepository.findOne(dto.helperId) : undefined;

    const result = await super.updateOne(req, { ...dto, supervisor, helper });
    if (dto.demands) {
      result.demands = await this.demandsService.syncDemands(result.id, dto.demands);
    }
    if (dto.client) {
      result.client = await this.clientsService.updateOneOrCreate(result.clientId, dto.client);
    }

    return result;
  }
}
