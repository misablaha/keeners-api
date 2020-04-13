import { IsDate, IsEnum, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GpsPoint } from '../../common/types/gps-point.type';
import { RequirementStatus } from '../requirement.entity';
import { UpdateClientDto } from '../../clients/dto/update-client.dto';
import { SyncDemandDto } from '../../demands/dto/sync-demand.dto';

export class UpdateRequirementDto {
  @ValidateNested()
  @Type(() => UpdateClientDto)
  @IsOptional()
  client?: UpdateClientDto;

  @IsString()
  @IsOptional()
  disease?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  region?: string;

  @ValidateNested()
  @Type(() => GpsPoint)
  @IsOptional()
  location?: GpsPoint;

  @ValidateNested()
  @Type(() => SyncDemandDto)
  @IsOptional()
  demands: SyncDemandDto[];

  @IsString()
  @IsOptional()
  note?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  supplyDate?: Date;

  @IsUUID('4')
  @IsOptional()
  supervisorId: string;

  @IsUUID('4')
  @IsOptional()
  helperId?: string;

  @IsNumber()
  @IsOptional()
  traveledDistance?: number;

  @IsEnum(RequirementStatus)
  @IsOptional()
  status?: RequirementStatus;
}
