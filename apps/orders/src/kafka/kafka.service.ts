import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { SendMessageDto } from './dto/send-message.dto';
import { MessageTypesEnum } from './enum/message-types.enum';
import { CustomersService } from 'src/customers/customers.service';

@Injectable()
export class KafkaService implements OnModuleInit {
  kafka: Kafka;

  constructor(private customerService: CustomersService) {}
  async onModuleInit() {
    const kafka = new Kafka({
      clientId: process.env.KAFKA_CLIENT_ID,
      brokers: [process.env.KAFKA_BROKER_URL],
    });
    this.kafka = kafka;
    const consumer = kafka.consumer({ groupId: 'test-group' });
    await consumer.connect();
    await consumer.subscribe({
      topic: process.env.KAFKA_TOPIC,
      fromBeginning: false,
    });
    await consumer.run({
      eachMessage: async ({ message }) => {
        this.handleMessage(
          JSON.parse(message.value.toString()) as SendMessageDto,
        );
      },
    });
  }

  sendMessage(data: any, topic: string = process.env.KAFKA_TOPIC) {
    const producer = this.kafka.producer();
    producer.connect().then(() => {
      producer.send({
        topic: topic,
        messages: [{ value: JSON.stringify(data) }],
      });
    });
    producer.disconnect();
  }

  async handleMessage({ type, payload }: SendMessageDto) {
    switch (type) {
      case MessageTypesEnum.CUSTOMER_CREATED:
        const newCustomer = {
          externalId: payload.id,
        };
        const created = await this.customerService.createCustomer(newCustomer);
        console.log('Customer created:', created);
        break;
      default:
        console.log('Unknown message type:', type);
        break;
    }
  }

  // listenForMessages() {
  //   const consumer = this.kafka.consumer({
  //     groupId: process.env.KAFKA_GROUP_ID,
  //   });
  //   consumer.connect().then(() => {
  //     consumer.subscribe({ topic: 'my-topic' });
  //     consumer.run({
  //       eachMessage: async ({ message }) => {
  //         const { type, payload } = JSON.parse(
  //           message.value.toString(),
  //         ) as SendMessageDto;
  //         console.log('>>>type', type);
  //         console.log('>>>payload', payload);
  //       },
  //     });
  //   });
  // }
}
