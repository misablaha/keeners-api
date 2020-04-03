import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { Service } from '../services/service.entity';
import { Requirement } from '../requirements/requirement.entity';

export enum DemandStatus {
  NEW = 'new',
  SUBMITTED = 'submitted',
  DONE = 'done',
  CANCELED = 'canceled',
}

@Entity()
export class Demand extends BaseEntity {
  @Column('uuid')
  public requirementId!: string;

  @ManyToOne(
    () => Requirement,
    requirement => requirement.demands,
  )
  public requirement!: Requirement;

  @Column('uuid')
  public serviceId!: string;

  @ManyToOne(() => Service, { eager: true })
  public service!: Service;

  @Column({
    type: 'enum',
    enum: DemandStatus,
    default: DemandStatus.NEW,
  })
  public status: DemandStatus;
}
