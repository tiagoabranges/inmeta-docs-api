/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, NotFoundException } from '@nestjs/common';
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
    const docs = await this.documentModel
      .find({ employeeId })
      .populate('documentTypeId')
      .exec();

    if (!docs.length) {
      throw new NotFoundException(
        'Nenhum documento encontrado para este colaborador',
      );
    }

    return docs;
  }

  async updateStatus(
    id: string,
    status: UpdateDocumentDto['status'],
  ): Promise<DocumentModel> {
    const updated = await this.documentModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .populate('employeeId')
      .populate('documentTypeId');

    if (!updated) {
      throw new NotFoundException(
        'Documento não encontrado para atualização de status',
      );
    }

    return updated;
  }

  async delete(id: string): Promise<{ message: string }> {
    const deleted = await this.documentModel.findByIdAndDelete(id).exec();

    if (!deleted) {
      throw new NotFoundException('Documento não encontrado para exclusão');
    }

    return { message: 'Documento deletado com sucesso' };
  }

  async getStatusByEmployee(employeeId: string) {
    const documents = await this.documentModel
      .find({ employeeId })
      .populate('documentTypeId')
      .exec();

    if (!documents.length) {
      throw new NotFoundException(
        'Nenhum documento registrado para este colaborador',
      );
    }

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

    if (!data.length) {
      throw new NotFoundException('Nenhum documento pendente encontrado');
    }

    return {
      data,
      total,
      page: pageNum,
      limit: limitNum,
      pages: Math.ceil(total / limitNum),
    };
  }
}
