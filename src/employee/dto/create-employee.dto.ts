import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty({ example: 'João da Silva' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'joao@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123.456.789-00' })
  @IsString()
  cpf: string;

  @ApiProperty({ example: '2024-05-01', required: false })
  @IsOptional()
  @IsDateString()
  hiredAt?: string;
}
