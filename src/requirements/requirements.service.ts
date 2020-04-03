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
import { Demand } from '../demands/demand.entity';

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
  ) {
    super(requirementRepository);
  }

  async createOne(req: CrudRequest, dto: CreateRequirementDto): Promise<Requirement> {
    const client = dto.clientId
      ? await this.clientRepository.findOneOrFail(dto.clientId)
      : this.clientRepository.create();

    if (dto.client) {
      Object.assign(client, dto.client);
      await this.clientRepository.save(client);
    }

    // const demands = await this.serviceRepository.findByIds(dto.demandIds);
    const demands: Demand[] = [];
    const supervisor = await this.supervisorRepository.findOneOrFail(dto.supervisorId);
    const helper = 'helperId' in dto ? await this.helperRepository.findOneOrFail(dto.helperId) : undefined;
    return super.createOne(req, { ...dto, client, demands, supervisor, helper });
  }

  async updateOne(req: CrudRequest, dto: UpdateRequirementDto): Promise<Requirement> {
    if (dto.client) {
      const requirement = await super.getOne(req);
      Object.assign(requirement.client, dto.client);
      await this.clientRepository.save(requirement.client);
    }

    // const demands = 'demandIds' in dto ? await this.serviceRepository.findByIds(dto.demandIds) : undefined;
    const demands: Demand[] = [];
    const supervisor =
      'supervisorId' in dto ? await this.supervisorRepository.findOneOrFail(dto.supervisorId) : undefined;
    const helper = 'helperId' in dto ? await this.helperRepository.findOneOrFail(dto.helperId) : undefined;
    return super.updateOne(req, { ...dto, demands, supervisor, helper });
  }
}
