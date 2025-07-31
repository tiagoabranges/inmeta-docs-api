import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/inmeta-docs', {}),

    EmployeeModule,
  ],
})
export class AppModule {}
