import { IsEmail, IsInt, IsOptional, IsPhoneNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GpsPoint } from '../../common/types/gps-point.type';

export class CreateClientDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsInt()
  @IsOptional()
  yearOfBirth?: number;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsPhoneNumber('CZ')
  phoneNumber: string;

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
}
