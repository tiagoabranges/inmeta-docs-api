import {
  Controller,
  Get,
  Patch,
  Body,
  Param,
  Delete,
  Post,
} from '@nestjs/common';
import { DocumentTypeService } from './document-type.service';
import { DocumentType } from './schemas/document-type.schema';
import { CreateDocumentTypeDto } from './dto/create-document-type.dto';
import { UpdateDocumentTypeDto } from './dto/update-document-type.dto';

@Controller('document-types')
export class DocumentTypeController {
  constructor(private readonly documentTypeService: DocumentTypeService) {}

  @Post()
  async create(@Body() body: CreateDocumentTypeDto): Promise<DocumentType> {
    return this.documentTypeService.create(body);
  }

  @Get()
  async findAll(): Promise<DocumentType[]> {
    return this.documentTypeService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateDocumentTypeDto,
  ): Promise<DocumentType> {
    return this.documentTypeService.update(id, data);
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<DocumentType> {
    return this.documentTypeService.findById(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.documentTypeService.delete(id);
  }
}
