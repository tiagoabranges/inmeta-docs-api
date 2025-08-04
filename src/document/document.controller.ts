import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentModel } from './schemas/document.schema';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { GetPendingDocumentsDto } from './dto/get-pending-documents.dto';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  async create(@Body() body: CreateDocumentDto): Promise<DocumentModel> {
    return this.documentService.create(body);
  }

  @Get()
  async findAll(): Promise<DocumentModel[]> {
    return this.documentService.findAll();
  }

  @Get('employee/:id')
  async findByEmployee(@Param('id') id: string): Promise<DocumentModel[]> {
    return this.documentService.findByEmployee(id);
  }

  @Patch(':id')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateDto: UpdateDocumentDto,
  ) {
    return this.documentService.updateStatus(id, updateDto.status);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.documentService.delete(id);
  }

  @Get('/employee/:id/status')
  async getStatus(@Param('id') id: string) {
    return this.documentService.getStatusByEmployee(id);
  }

  @Get('pending')
  async findPending(@Query() query: GetPendingDocumentsDto) {
    return this.documentService.findPending(query);
  }
}
