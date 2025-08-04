import { Injectable, NotFoundException } from '@nestjs/common';
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
    const documentType = await this.documentTypeModel.findById(id).exec();
    if (!documentType) {
      throw new NotFoundException('Tipo de documento não encontrado');
    }
    return documentType;
  }

  async update(id: string, data: UpdateDocumentTypeDto): Promise<DocumentType> {
    const updated = await this.documentTypeModel
      .findByIdAndUpdate(id, data, {
        new: true,
      })
      .exec();

    if (!updated) {
      throw new NotFoundException(
        'Tipo de documento não encontrado para atualização',
      );
    }

    return updated;
  }

  async delete(id: string): Promise<{ message: string }> {
    const deleted = await this.documentTypeModel.findByIdAndDelete(id).exec();

    if (!deleted) {
      throw new NotFoundException(
        'Tipo de documento não encontrado para exclusão',
      );
    }

    return { message: 'Tipo de documento deletado com sucesso' };
  }
}
