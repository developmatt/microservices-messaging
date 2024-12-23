import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class KafkaService implements OnModuleInit {
  kafka: Kafka;
  onModuleInit() {
    const kafka = new Kafka({
      clientId: process.env.KAFKA_CLIENT_ID,
      brokers: ['localhost:29092'],
    });
    this.kafka = kafka;
  }

  sendMessage(data: SendMessageDto, topic: string = process.env.KAFKA_TOPIC) {
    const producer = this.kafka.producer();
    producer.connect().then(() => {
      producer.send({
        topic: topic,
        messages: [{ value: JSON.stringify(data) }],
      });
    });
    producer.disconnect();
  }

  listenForMessages(topic: string = process.env.KAFKA_TOPIC) {
    const consumer = this.kafka.consumer({
      groupId: process.env.KAFKA_GROUP_ID,
    });
    consumer.connect().then(() => {
      consumer.subscribe({ topic });
      consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            topic,
            partition,
            value: message.value.toString(),
          });
        },
      });
    });
  }
}
