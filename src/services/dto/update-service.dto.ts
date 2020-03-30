import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateServiceDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  note?: string;

  @IsBoolean()
  @IsOptional()
  isInternal?: boolean;
}
