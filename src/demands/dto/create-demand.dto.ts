import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { DemandStatus } from '../demand.entity';

export class CreateDemandDto {
  @IsUUID('4')
  public serviceId!: string;

  @IsEnum(DemandStatus)
  @IsOptional()
  status: DemandStatus = DemandStatus.NEW;
}
