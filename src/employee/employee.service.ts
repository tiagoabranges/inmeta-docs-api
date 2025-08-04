import { Injectable } from '@nestjs/common';
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

  async update(id: string, data: UpdateEmployeeDto): Promise<Employee> {
    const updateData = {
      ...data,
      hiredAt: data.hiredAt ? new Date(data.hiredAt) : undefined,
    };

    return this.employeeModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
  }

  async findById(id: string): Promise<Employee> {
    return this.employeeModel.findById(id).exec();
  }

  async delete(id: string): Promise<void> {
    await this.employeeModel.findByIdAndDelete(id).exec();
  }
}
