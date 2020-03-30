import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';

@Entity()
export class Supervisor extends BaseEntity {
  @Column({ charset: 'utf8mb4' })
  @Index({ unique: true })
  name: string;
}
