import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit {
  kafka: Kafka;
  onModuleInit() {
    const kafka = new Kafka({
      clientId: 'adminclient-1',
      brokers: ['localhost:29092'],
    });
    this.kafka = kafka;
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

  listenForMessages() {
    const consumer = this.kafka.consumer({
      groupId: process.env.KAFKA_GROUP_ID,
    });
    consumer.connect().then(() => {
      consumer.subscribe({ topic: 'my-topic' });
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
