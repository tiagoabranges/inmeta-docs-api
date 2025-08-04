import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { DocumentType } from 'src/document-type/schemas/document-type.schema';
import { Employee } from 'src/employee/schemas/employee.schema';

export type DocumentEntity = DocumentModel & Document;

@Schema({ timestamps: true })
export class DocumentModel {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  })
  employeeId: string | Employee;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DocumentType',
  })
  documentTypeId: string | DocumentType;

  @Prop({ default: 'pendente' })
  status: string;
}

export const DocumentSchema = SchemaFactory.createForClass(DocumentModel);
