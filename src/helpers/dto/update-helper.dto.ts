import { IsBoolean, IsEmail, IsOptional, IsPhoneNumber, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GpsPoint } from '../../common/types/gps-point.type';

export class UpdateHelperDto {
  @IsString()
  @IsOptional()
  callSign: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsPhoneNumber('CZ')
  @IsOptional()
  phoneNumber?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

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

  @IsUUID('4', { each: true })
  @IsOptional()
  provideIds: string[];
}
