import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit {
  kafka: Kafka;
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
        console.log(message.value.toString());
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
