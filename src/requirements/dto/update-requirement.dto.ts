import { IsDate, IsEnum, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GpsPoint } from '../../common/types/gps-point.type';
import { RequirementStatus } from '../requirement.entity';
import { UpdateRecipientDto } from '../../recipients/dto/update-recipient.dto';

export class UpdateRequirementDto {
  @ValidateNested()
  @Type(() => UpdateRecipientDto)
  @IsOptional()
  recipient?: UpdateRecipientDto;

  @IsString()
  @IsOptional()
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
