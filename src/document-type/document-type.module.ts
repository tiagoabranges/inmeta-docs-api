import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentTypeService } from './document-type.service';
import { DocumentTypeController } from './document-type.controller';
import {
  DocumentType,
  DocumentTypeSchema,
} from './schemas/document-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DocumentType.name, schema: DocumentTypeSchema },
    ]),
  ],
  controllers: [DocumentTypeController],
  providers: [DocumentTypeService],
})
export class DocumentTypeModule {}
