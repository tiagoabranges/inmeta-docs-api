import { Body, Controller, Get, Post } from '@nestjs/common';
import { DocumentTypeService } from './document-type.service';
import { DocumentType } from './schemas/document-type.schema';

@Controller('document-types')
export class DocumentTypeController {
  constructor(private readonly documentTypeService: DocumentTypeService) {}

  @Post()
  async create(@Body() body: Partial<DocumentType>): Promise<DocumentType> {
    return this.documentTypeService.create(body);
  }

  @Get()
  async findAll(): Promise<DocumentType[]> {
    return this.documentTypeService.findAll();
  }
}
