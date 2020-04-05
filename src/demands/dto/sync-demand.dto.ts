import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { DemandStatus } from '../demand.entity';

export class SyncDemandDto {
  @IsUUID('4')
  @IsOptional()
  public id!: string;

  @IsUUID('4')
  @IsOptional()
  public serviceId!: string;

  @IsEnum(DemandStatus)
  @IsOptional()
  status: DemandStatus;
}
