import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DocumentModel, DocumentEntity } from './schemas/document.schema';
import { Model } from 'mongoose';

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel(DocumentModel.name)
    private readonly documentModel: Model<DocumentEntity>,
  ) {}

  async create(data: Partial<DocumentModel>): Promise<DocumentModel> {
    const created = new this.documentModel(data);
    return created.save();
  }

  async findAll(): Promise<DocumentModel[]> {
    return this.documentModel
      .find()
      .populate('employeeId')
      .populate('documentTypeId')
      .exec();
  }

  async findByEmployee(employeeId: string): Promise<DocumentModel[]> {
    return this.documentModel
      .find({ employeeId })
      .populate('documentTypeId')
      .exec();
  }

  async findPending(): Promise<DocumentModel[]> {
    return this.documentModel
      .find({ status: { $ne: 'enviado' } })
      .populate('employeeId')
      .populate('documentTypeId')
      .exec();
  }
}
