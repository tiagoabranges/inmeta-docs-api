import { IsOptional, IsString, IsNumberString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetPendingDocumentsDto {
  @ApiPropertyOptional({ description: 'ID do colaborador (employeeId)' })
  @IsOptional()
  @IsString()
  employeeId?: string;

  @ApiPropertyOptional({
    description: 'ID do tipo de documento (documentTypeId)',
  })
  @IsOptional()
  @IsString()
  documentTypeId?: string;

  @ApiPropertyOptional({ description: 'Página atual (default: 1)' })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiPropertyOptional({ description: 'Quantidade por página (default: 10)' })
  @IsOptional()
  @IsNumberString()
  limit?: string;
}
