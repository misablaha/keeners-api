import { IsOptional, IsString } from 'class-validator';

export class UpdateSupervisorDto {
  @IsString()
  @IsOptional()
  name: string;
}
