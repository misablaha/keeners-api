import { differenceBy, keyBy } from 'lodash';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Demand } from './demand.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { SyncDemandDto } from './dto/sync-demand.dto';

@Injectable()
export class DemandsService extends TypeOrmCrudService<Demand> {
  constructor(
    @InjectRepository(Demand)
    private readonly repository: Repository<Demand>,
  ) {
    super(repository);
  }

  public async syncDemands(requirementId: string, demands: SyncDemandDto[]): Promise<Demand[]> {
    const newDemands = demands.map(d => ({ ...d, requirementId: requirementId }));
    const oldDemands = await this.repository.find({ requirementId });

    const toDelete = differenceBy(oldDemands, newDemands, 'id');
    if (toDelete.length > 0) {
      throw this.throwBadRequestException('It is not allowed to delete existing demand.');
    }

    const newDemandsMap = keyBy(newDemands, 'id');
    const oldDemandsMap = keyBy(oldDemands, 'id');

    oldDemands.forEach(d => {
      if (d.serviceId !== newDemandsMap[d.id].serviceId) {
        throw this.throwBadRequestException('It is not allowed to change service in the existing demand.');
      }
    });

    // Filter new demands without id
    const toInsert = newDemands.filter(d => !d.id);
    if (toInsert.length > 0) {
      await this.repository.insert(toInsert);
    }

    // Filter new demands with id that have changed status
    const toUpdate = newDemands.filter(d => d.id && d.status !== oldDemandsMap[d.id].status);
    await Promise.all(toUpdate.map(d => this.repository.update(d.id, d)));

    return this.repository.find({ requirementId });
  }
}
