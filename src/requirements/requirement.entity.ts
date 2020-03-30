import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Service } from '../services/service.entity';
import { BaseEntity } from '../common/entities/base.entity';
import { Recipient } from '../recipients/recipient.entity';
import { Helper } from '../helpers/helper.entity';
import { GpsPoint, gpsPointFromString, gpsPointToString } from '../common/types/gps-point.type';
import { Supervisor } from '../supervisors/supervisor.entity';

export enum RequirementStatus {
  OPEN = 'open',
  ASSIGN = 'assign',
  DONE = 'done',
  CANCEL = 'cancel',
}

@Entity()
export class Requirement extends BaseEntity {
  @ManyToOne(
    () => Recipient,
    recipient => recipient.requirements,
  )
  recipient: Recipient;

  @Column({ charset: 'utf8mb4', nullable: true })
  address: string;

  @Column({
    type: 'varchar',
    nullable: true,
    transformer: {
      from: (v?: string) => v && gpsPointFromString(v),
      to: (v?: GpsPoint) => v && gpsPointToString(v),
    },
  })
  location: GpsPoint;

  @ManyToMany(() => Service, { eager: true })
  @JoinTable()
  demands: Service[];

  @Column({ type: 'text', charset: 'utf8mb4', nullable: true })
  note: string;

  @Column({ nullable: true })
  supplyDate: Date;

  @ManyToOne(() => Supervisor, { nullable: true })
  supervisor: Supervisor;

  @ManyToOne(
    () => Helper,
    helper => helper.requirements,
    { nullable: true },
  )
  helper: Helper;

  @Column({
    type: 'enum',
    enum: RequirementStatus,
    default: RequirementStatus.OPEN,
  })
  status: RequirementStatus;
}
