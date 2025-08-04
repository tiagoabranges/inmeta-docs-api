import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  DocumentType,
  DocumentTypeDocument,
} from './schemas/document-type.schema';
import { Model } from 'mongoose';
import { CreateDocumentTypeDto } from './dto/create-document-type.dto';
import { UpdateDocumentTypeDto } from './dto/update-document-type.dto';

@Injectable()
export class DocumentTypeService {
  constructor(
    @InjectModel(DocumentType.name)
    private readonly documentTypeModel: Model<DocumentTypeDocument>,
  ) {}

  async create(data: CreateDocumentTypeDto): Promise<DocumentType> {
    const created = new this.documentTypeModel(data);
    return created.save();
  }

  async findAll(): Promise<DocumentType[]> {
    return this.documentTypeModel.find().exec();
  }

  async findById(id: string): Promise<DocumentType> {
    return this.documentTypeModel.findById(id).exec();
  }

  async update(id: string, data: UpdateDocumentTypeDto): Promise<DocumentType> {
    return this.documentTypeModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }

  async delete(id: string): Promise<DocumentType> {
    return this.documentTypeModel.findByIdAndDelete(id).exec();
  }
}
