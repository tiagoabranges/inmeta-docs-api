import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDocumentDto {
  @ApiProperty({ example: 'Documento de identidade' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'enviado', enum: ['pendente', 'enviado'] })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({ example: '64cc7c1b8a3fabc123456789' })
  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @ApiProperty({ example: '64cc7c1b8a3fabc123456799' })
  @IsString()
  @IsNotEmpty()
  documentTypeId: string;
}
