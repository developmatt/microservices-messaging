import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [CustomersService],
  exports: [CustomersService],
  imports: [PrismaModule],
})
export class CustomersModule {}
