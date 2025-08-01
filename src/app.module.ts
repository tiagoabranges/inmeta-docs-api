import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeModule } from './employee/employee.module';
import { DocumentTypeModule } from './document-type/document-type.module';
import { DocumentModule } from './document/document.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/inmeta-docs', {}),

    EmployeeModule,

    DocumentTypeModule,

    DocumentModule,
  ],
})
export class AppModule {}
