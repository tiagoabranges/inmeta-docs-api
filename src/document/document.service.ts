/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DocumentModel, DocumentEntity } from './schemas/document.schema';
import { Model } from 'mongoose';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { GetPendingDocumentsDto } from './dto/get-pending-documents.dto';

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel(DocumentModel.name)
    private readonly documentModel: Model<DocumentEntity>,
  ) {}

  async create(data: CreateDocumentDto): Promise<DocumentModel> {
    const created = new this.documentModel({
      ...data,
      status: data.status || 'pendente',
    });
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

  async updateStatus(id: string, status: UpdateDocumentDto['status']) {
    return this.documentModel.findByIdAndUpdate(id, { status }, { new: true });
  }

  async delete(id: string) {
    return this.documentModel.findByIdAndDelete(id);
  }

  async getStatusByEmployee(employeeId: string) {
    const documents = await this.documentModel
      .find({ employeeId })
      .populate('documentTypeId')
      .exec();

    const sentTypes = documents
      .filter((doc) => doc.status === 'enviado')
      .map((doc) => {
        if (
          typeof doc.documentTypeId === 'object' &&
          'name' in doc.documentTypeId
        ) {
          return doc.documentTypeId.name;
        }
        return null;
      })
      .filter((name): name is string => !!name);

    const allTypes = documents
      .map((doc) => {
        if (
          typeof doc.documentTypeId === 'object' &&
          'name' in doc.documentTypeId
        ) {
          return doc.documentTypeId.name;
        }
        return null;
      })
      .filter((name): name is string => !!name);

    const uniqueSent = [...new Set(sentTypes)];
    const uniqueAll = [...new Set(allTypes)];

    const pending = uniqueAll.filter((name) => !uniqueSent.includes(name));

    return {
      employeeId,
      sent: uniqueSent,
      pending,
    };
  }

  async findPending(query: GetPendingDocumentsDto) {
    const { employeeId, documentTypeId, page = '1', limit = '10' } = query;

    const filters: any = { status: { $ne: 'enviado' } };

    if (employeeId) filters.employeeId = employeeId;
    if (documentTypeId) filters.documentTypeId = documentTypeId;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    const [data, total] = await Promise.all([
      this.documentModel
        .find(filters)
        .populate('employeeId')
        .populate('documentTypeId')
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .exec(),

      this.documentModel.countDocuments(filters),
    ]);

    return {
      data,
      total,
      page: pageNum,
      limit: limitNum,
      pages: Math.ceil(total / limitNum),
    };
  }
}
