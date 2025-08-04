import { IsOptional, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateEmployeeDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  cpf?: string;

  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => new Date(value))
  hiredAt?: Date;
}
