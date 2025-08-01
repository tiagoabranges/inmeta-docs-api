import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { DocumentModel, DocumentSchema } from './schemas/document.schema';
import { Employee, EmployeeSchema } from '../employee/schemas/employee.schema';
import {
  DocumentType,
  DocumentTypeSchema,
} from '../document-type/schemas/document-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DocumentModel.name, schema: DocumentSchema },
      { name: Employee.name, schema: EmployeeSchema },
      { name: DocumentType.name, schema: DocumentTypeSchema },
    ]),
  ],
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentModule {}
