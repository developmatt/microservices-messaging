import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { CustomersModule } from 'src/customers/customers.module';

@Module({
  providers: [KafkaService],
  exports: [KafkaService],
  imports: [CustomersModule],
})
export class KafkaModule {}
