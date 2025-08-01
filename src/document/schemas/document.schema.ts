// src/document/schemas/document.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose'; // ✅ aqui estava o erro

export type DocumentEntity = DocumentModel & Document;

@Schema({ timestamps: true })
export class DocumentModel {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  })
  employeeId: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DocumentType',
  })
  documentTypeId: string;

  @Prop({ default: 'pendente' })
  status: string;
}

export const DocumentSchema = SchemaFactory.createForClass(DocumentModel);
