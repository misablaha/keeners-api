import { IsEnum } from 'class-validator';
import { DemandStatus } from '../demand.entity';

export class UpdateDemandDto {
  @IsEnum(DemandStatus)
  status: DemandStatus;
}
