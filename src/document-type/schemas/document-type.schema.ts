import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DocumentTypeDocument = DocumentType & Document;

@Schema({ timestamps: true })
export class DocumentType {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const DocumentTypeSchema = SchemaFactory.createForClass(DocumentType);

DocumentTypeSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.__v;
    delete ret.createdAt;
    delete ret.updatedAt;
    return ret;
  },
});
