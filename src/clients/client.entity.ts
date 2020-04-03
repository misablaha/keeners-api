import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Expose } from 'class-transformer';
import { BaseEntity } from '../common/entities/base.entity';
import { formatPhoneNumber, PhoneNumberFormat } from '../common/utils/phone-number';
import { GpsPoint, gpsPointFromString, gpsPointToString } from '../common/types/gps-point.type';
import { Requirement } from '../requirements/requirement.entity';

@Entity()
export class Client extends BaseEntity {
  @Column({ charset: 'utf8mb4', nullable: true })
  firstName?: string;

  @Column({ charset: 'utf8mb4', nullable: true })
  lastName?: string;

  @Expose()
  get name() {
    return [this.firstName, this.lastName].join(' ').trim();
  }

  @Column({ type: 'smallint', nullable: true })
  yearOfBirth?: number;

  @Expose()
  get age() {
    return this.yearOfBirth && new Date().getFullYear() - this.yearOfBirth;
  }

  @Column({ charset: 'utf8mb4', nullable: true })
  @Index({ unique: true })
  email?: string;

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

  @OneToMany(
    () => Requirement,
    requirement => requirement.client,
  )
  requirements: Requirement[];
}
