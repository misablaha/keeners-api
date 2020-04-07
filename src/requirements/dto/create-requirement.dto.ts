import { IsDate, IsEnum, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GpsPoint } from '../../common/types/gps-point.type';
import { RequirementStatus } from '../requirement.entity';
import { CreateClientDto } from '../../clients/dto/create-client.dto';
import { SyncDemandDto } from '../../demands/dto/sync-demand.dto';

export class CreateRequirementDto {
  @IsUUID('4')
  @IsOptional()
  clientId?: string;

  @ValidateNested()
  @Type(() => CreateClientDto)
  client: CreateClientDto;

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
