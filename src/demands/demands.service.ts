import { differenceBy, keyBy } from 'lodash';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '../core/crud.service';
import { Demand } from './demand.entity';
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

    // New demands without id will be inserted
    const toInsert = newDemands.filter(d => !d.id);
    // New demands with id having changed status will be updated
    const toUpdate = newDemands.filter(d => d.id && d.status !== oldDemandsMap[d.id].status);

    oldDemands.forEach(d => {
      if (d.serviceId !== newDemandsMap[d.id].serviceId) {
        throw this.throwBadRequestException('It is not allowed to change service in the existing demand.');
      }
    });

    await Promise.all(toInsert.map(d => this.repository.insert(d)));
    await Promise.all(toUpdate.map(d => this.repository.update(d.id, d)));

    return this.repository.find({ requirementId });
  }
}
