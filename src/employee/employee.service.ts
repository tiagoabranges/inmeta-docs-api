import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, EmployeeDocument } from './schemas/employee.schema';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
  ) {}

  async create(data: CreateEmployeeDto): Promise<Employee> {
    const transformed = {
      ...data,
      hiredAt: data.hiredAt ? new Date(data.hiredAt) : undefined,
    };

    const newEmployee = new this.employeeModel(transformed);
    return newEmployee.save();
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeModel.find().exec();
  }

  async findById(id: string): Promise<Employee> {
    const employee = await this.employeeModel.findById(id).exec();
    if (!employee) {
      throw new NotFoundException('Colaborador não encontrado');
    }
    return employee;
  }

  async update(id: string, data: UpdateEmployeeDto): Promise<Employee> {
    const updateData = {
      ...data,
      hiredAt: data.hiredAt ? new Date(data.hiredAt) : undefined,
    };

    const updated = await this.employeeModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updated) {
      throw new NotFoundException('Colaborador não encontrado para atualizar');
    }

    return updated;
  }

  async delete(id: string): Promise<{ message: string }> {
    const deleted = await this.employeeModel.findByIdAndDelete(id).exec();

    if (!deleted) {
      throw new NotFoundException('Colaborador não encontrado para exclusão');
    }

    return { message: 'Colaborador deletado com sucesso' };
  }
}
