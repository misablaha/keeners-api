import { IsDate, IsEnum, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GpsPoint } from '../../common/types/gps-point.type';
import { RequirementStatus } from '../requirement.entity';
import { UpdateClientDto } from '../../clients/dto/update-client.dto';

export class UpdateRequirementDto {
  @ValidateNested()
  @Type(() => UpdateClientDto)
  @IsOptional()
  client?: UpdateClientDto;

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

  @IsEnum(RequirementStatus)
  @IsOptional()
  status?: RequirementStatus;
}
