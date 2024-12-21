import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { KafkaService } from 'src/kafka/kafka.service';

@Injectable()
export class CustomersService {
  constructor(
    private prisma: PrismaService,
    private kafkaService: KafkaService
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const created = await this.prisma.customer.create({
      data: createCustomerDto,
    });

    this.kafkaService.sendMessage(created, 'novo_topico');

    return created
  }

  findAll() {
    return this.prisma.customer.findMany();
  }

  findOne(id: string) {
    return this.prisma.customer.findUnique({
      where: { id },
    });
  }

  findByEmail(email: string) {
    return this.prisma.customer.findFirst({
      where: { email },
    });
  }

  update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.prisma.customer.update({
      where: { id },
      data: updateCustomerDto,
    });
  }

  remove(id: string) {
    return this.prisma.customer.delete({
      where: { id },
    });
  }
}
