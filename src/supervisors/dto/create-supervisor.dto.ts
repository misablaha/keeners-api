import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSupervisorDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
