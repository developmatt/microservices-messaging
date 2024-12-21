import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private prismaService: PrismaService) {}

  createCustomer(data: CreateCustomerDto) {
    return this.prismaService.customer.create({ data });
  }
}
