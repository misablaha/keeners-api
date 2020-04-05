import { Column, Entity, Index, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Expose } from 'class-transformer';
import { BaseEntity } from '../common/entities/base.entity';
import { formatPhoneNumber, PhoneNumberFormat } from '../common/utils/phone-number';
import { GpsPoint, gpsPointFromString, gpsPointToString } from '../common/types/gps-point.type';
import { Service } from '../services/service.entity';
import { Requirement } from '../requirements/requirement.entity';

@Entity()
export class Helper extends BaseEntity {
  @Column({ unique: true, nullable: true })
  callSign: string;

  @Column({ charset: 'utf8mb4' })
  firstName: string;

  @Column({ charset: 'utf8mb4' })
  lastName: string;

  @Expose()
  get name() {
    return [this.firstName, this.lastName].join(' ').trim();
  }

  @Column({ charset: 'utf8mb4', nullable: true })
  @Index({ unique: true })
  email: string;

  @Column({
    charset: 'utf8mb4',
    nullable: true,
    transformer: {
      from: (v: string): string => formatPhoneNumber(v),
      to: (v: string): string => formatPhoneNumber(v, PhoneNumberFormat.E164),
    },
  })
  @Index({ unique: true })
  phoneNumber: string;

  @Column({ default: true })
  isActive: boolean;

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

  @Column({ type: 'text', charset: 'utf8mb4', nullable: true })
  note: string;

  @ManyToMany(() => Service)
  @JoinTable()
  provide: Service[];

  @Expose()
  get provideIds() {
    return this.provide && this.provide.map(s => s.id);
  }

  @OneToMany(
    () => Requirement,
    requirement => requirement.helper,
  )
  requirements: Requirement[];
}
