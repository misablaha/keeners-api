import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Optional } from '@nestjs/common';
import { GpsPoint } from '../../common/types/gps-point.type';
import { Type } from 'class-transformer';
import { RequirementStatus } from '../requirement.entity';

export class UpdateRequirementDto {
  @IsString()
  @IsNotEmpty()
  @Optional()
  address?: string;

  @ValidateNested()
  @Type(() => GpsPoint)
  @IsOptional()
  location?: GpsPoint;

  @IsUUID('4', { each: true })
  @IsOptional()
  demandIds: string[];

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
