import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDocumentTypeDto {
  @ApiProperty({ example: 'CPF' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
