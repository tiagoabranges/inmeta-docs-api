// src/document/dto/update-document.dto.ts
import { IsIn, IsOptional } from 'class-validator';

export class UpdateDocumentDto {
  @IsOptional()
  @IsIn(['pendente', 'enviado'])
  status?: string;
}
