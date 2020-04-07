import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { GpsPoint, gpsPointFromString, gpsPointToString } from '../common/types/gps-point.type';
import { Demand } from '../demands/demand.entity';
import { Helper } from '../helpers/helper.entity';
import { Client } from '../clients/client.entity';
import { Supervisor } from '../supervisors/supervisor.entity';

export enum RequirementStatus {
  NEW = 'new',
  PROCESSING = 'processing',
  DONE = 'done',
  CANCELED = 'canceled',
}

@Entity()
export class Requirement extends BaseEntity {
  @Column('uuid')
  clientId!: string;

  @ManyToOne(
    () => Client,
    client => client.requirements,
  )
  client: Client;

  @Column({ charset: 'utf8mb4', nullable: true })
  address: string;

  @Column({ charset: 'utf8mb4', nullable: true })
  region: string;

  @Column({
    type: 'varchar',
    nullable: true,
    transformer: {
      from: (v?: string) => v && gpsPointFromString(v),
      to: (v?: GpsPoint) => v && gpsPointToString(v),
    },
  })
  location: GpsPoint;

  @OneToMany(
    () => Demand,
    demand => demand.requirement,
    { eager: true },
  )
  demands: Demand[];

  @Column({ type: 'text', charset: 'utf8mb4', nullable: true })
  note: string;

  @Column({ nullable: true })
  supplyDate: Date;

  @Column('uuid', { nullable: true })
  supervisorId: string;

  @ManyToOne(() => Supervisor, { nullable: true })
  supervisor: Supervisor;

  @Column('uuid', { nullable: true })
  helperId: string;

  @ManyToOne(() => Helper, { nullable: true })
  helper?: Helper;

  @Column({ type: 'float', default: 0 })
  traveledDistance: number;

  @Column({
    type: 'enum',
    enum: RequirementStatus,
    default: RequirementStatus.NEW,
  })
  status: RequirementStatus;
}
