import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';

@Entity()
export class Service extends BaseEntity {
  @Column({ charset: 'utf8mb4' })
  @Index({ unique: true })
  name: string;

  @Column({ type: 'text', charset: 'utf8mb4', nullable: true })
  note: string;

  @Column({ default: false })
  isInternal: boolean;
}
