import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { Helper } from './helper.entity';
import { Service } from '../services/service.entity';
import { UpdateHelperDto } from './dto/update-helper.dto';

@Injectable()
export class HelpersService extends TypeOrmCrudService<Helper> {
  constructor(
    @InjectRepository(Helper)
    private readonly helperRepository: Repository<Helper>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {
    super(helperRepository);
  }

  async updateOne(req: CrudRequest, dto: UpdateHelperDto): Promise<Helper> {
    const helper = await super.updateOne(req, dto);
    if (dto.provideIds) {
      helper.provide = await this.serviceRepository.findByIds(dto.provideIds);
      await this.helperRepository.save(helper);
    }
    return helper;
  }

  async addService(helperId: string, serviceId: string): Promise<Helper> {
    const helper = await this.helperRepository.findOne(helperId);
    if (helper === undefined) {
      return Promise.reject(new NotFoundException(`${this.alias} not found`));
    }

    const existing = helper.provide.find(s => s.id === serviceId);
    if (!existing) {
      const service = await this.serviceRepository.findOneOrFail(serviceId);
      helper.provide.push(service);
      await this.helperRepository.save(helper);
    }
    return helper;
  }

  async removeService(helperId: string, serviceId: string): Promise<Helper> {
    const helper = await this.helperRepository.findOne(helperId);
    if (helper === undefined) {
      return Promise.reject(new NotFoundException(`${this.alias} not found`));
    }

    const existing = helper.provide.find(s => s.id === serviceId);
    if (existing) {
      helper.provide = helper.provide.filter(s => s.id !== serviceId);
      await this.helperRepository.save(helper);
    }
    return helper;
  }
}
