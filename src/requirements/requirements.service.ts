import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRequirementDto } from './dto/create-requirement.dto';
import { Requirement } from './requirement.entity';
import { UpdateRequirementDto } from './dto/update-requirement.dto';
import { Service } from '../services/service.entity';
import { Recipient } from '../recipients/recipient.entity';
import { Supervisor } from '../supervisors/supervisor.entity';
import { Helper } from '../helpers/helper.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CrudRequest } from '@nestjsx/crud';

@Injectable()
export class RequirementsService extends TypeOrmCrudService<Requirement> {
  constructor(
    @InjectRepository(Helper)
    private readonly helperRepository: Repository<Helper>,
    @InjectRepository(Recipient)
    private readonly recipientRepository: Repository<Recipient>,
    @InjectRepository(Requirement)
    private readonly requirementRepository: Repository<Requirement>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @InjectRepository(Supervisor)
    private readonly supervisorRepository: Repository<Supervisor>,
  ) {
    super(requirementRepository);
  }

  async createOne(req: CrudRequest, dto: CreateRequirementDto): Promise<Requirement> {
    const recipient = dto.recipientId
      ? await this.recipientRepository.findOneOrFail(dto.recipientId)
      : this.recipientRepository.create();

    if (dto.recipient) {
      Object.assign(recipient, dto.recipient);
      await this.recipientRepository.save(recipient);
    }

    const demands = await this.serviceRepository.findByIds(dto.demandIds);
    const supervisor = await this.supervisorRepository.findOneOrFail(dto.supervisorId);
    const helper = 'helperId' in dto ? await this.helperRepository.findOneOrFail(dto.helperId) : undefined;
    return super.createOne(req, { ...dto, recipient, demands, supervisor, helper });
  }

  async updateOne(req: CrudRequest, dto: UpdateRequirementDto): Promise<Requirement> {
    if (dto.recipient) {
      const requirement = await super.getOne(req);
      Object.assign(requirement.recipient, dto.recipient);
      await this.recipientRepository.save(requirement.recipient);
    }

    const demands = 'demandIds' in dto ? await this.serviceRepository.findByIds(dto.demandIds) : undefined;
    const supervisor =
      'supervisorId' in dto ? await this.supervisorRepository.findOneOrFail(dto.supervisorId) : undefined;
    const helper = 'helperId' in dto ? await this.helperRepository.findOneOrFail(dto.helperId) : undefined;
    return super.updateOne(req, { ...dto, demands, supervisor, helper });
  }
}
