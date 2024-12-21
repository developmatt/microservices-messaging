import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
  imports: [PrismaModule, KafkaModule],
  exports: [CustomersService],
})
export class CustomersModule {}
