import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentModel } from './schemas/document.schema';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  async create(@Body() body: Partial<DocumentModel>): Promise<DocumentModel> {
    return this.documentService.create(body);
  }

  @Get()
  async findAll(): Promise<DocumentModel[]> {
    return this.documentService.findAll();
  }

  @Get('pending')
  async findPending(): Promise<DocumentModel[]> {
    return this.documentService.findPending();
  }

  @Get('employee/:id')
  async findByEmployee(@Param('id') id: string): Promise<DocumentModel[]> {
    return this.documentService.findByEmployee(id);
  }
}
