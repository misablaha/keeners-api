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

@Injectable()
export class RequirementsService {
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
  ) {}

  async create(data: CreateRequirementDto): Promise<Requirement> {
    const entity = new Requirement();
    entity.recipient = await this.recipientRepository.findOneOrFail(data.recipientId);
    entity.address = data.address || entity.recipient.address;
    entity.location = data.location || entity.recipient.location;
    entity.demands = await this.serviceRepository.findByIds(data.demandIds);
    if (typeof data.note === 'string') {
      entity.note = data.note;
    }
    if (data.supplyDate) {
      entity.supplyDate = data.supplyDate;
    }
    entity.supervisor = await this.supervisorRepository.findOneOrFail(data.supervisorId);
    if (data.helperId) {
      entity.helper = await this.helperRepository.findOneOrFail(data.helperId);
    }
    if (data.status) {
      entity.status = data.status;
    }

    return this.requirementRepository.save(entity);
  }

  async findAll(): Promise<Requirement[]> {
    return this.requirementRepository.find({
      relations: ['demands', 'helper', 'recipient', 'supervisor'],
    });
  }

  findOne(id: string): Promise<Requirement> {
    return this.requirementRepository.findOneOrFail(id, {
      relations: ['demands', 'helper', 'recipient', 'supervisor'],
    });
  }

  async updateOne(id: string, data: UpdateRequirementDto): Promise<Requirement> {
    const entity = await this.requirementRepository.findOneOrFail(id);

    if (data.address) {
      entity.address = data.address;
    }
    if (data.location) {
      entity.location = data.location;
    }
    if (data.demandIds) {
      entity.demands = await this.serviceRepository.findByIds(data.demandIds);
    }
    if (data.note) {
      entity.note = data.note;
    }
    if (data.supplyDate) {
      entity.supplyDate = data.supplyDate;
    }
    if (data.supervisorId) {
      entity.supervisor = await this.supervisorRepository.findOneOrFail(data.supervisorId);
    }
    if (data.helperId) {
      entity.helper = await this.helperRepository.findOneOrFail(data.helperId);
    }
    if (data.status) {
      entity.status = data.status;
    }

    return this.requirementRepository.save(entity);
  }

  async remove(id: string): Promise<void> {
    await this.requirementRepository.delete(id);
  }
}
