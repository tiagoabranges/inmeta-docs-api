import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  DocumentType,
  DocumentTypeDocument,
} from './schemas/document-type.schema';

@Injectable()
export class DocumentTypeService {
  constructor(
    @InjectModel(DocumentType.name)
    private documentTypeModel: Model<DocumentTypeDocument>,
  ) {}

  async create(data: Partial<DocumentType>): Promise<DocumentType> {
    const created = new this.documentTypeModel(data);
    return created.save();
  }

  async findAll(): Promise<DocumentType[]> {
    return this.documentTypeModel.find().exec();
  }
}
