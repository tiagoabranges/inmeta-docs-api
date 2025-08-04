import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateDocumentDto {
  @IsMongoId()
  employeeId: string;

  @IsMongoId()
  documentTypeId: string;

  @IsOptional()
  @IsString()
  status?: string;
}
