import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitmqService {
    private readonly client: ClientProxy;
    private connection: amqp.Connection;
    private channel: amqp.Channel;

    constructor(){}

    async sendToRabbitMQ(message) {
      let ref = this;
      let url = process.env.AMQP_URL || 'amqp://guest:guest@rabbitmq:5672';
      ref.connection = await amqp.connect(url);
      ref.channel = await ref.connection.createChannel();
  
      // Assurez-vous que la connexion et le canal sont définis et connectés à RabbitMQ
      if (!this.connection || !this.channel) {
        console.error('RabbitMQ connection or channel not initialized');
        return;
      }
      
    
      // Envoi du message à la queue
      await this.channel.sendToQueue('queue_rabbitmq', Buffer.from(JSON.stringify(message)));
      console.log(new Date().toString() + ' : Message sent to rabbitmq');
    }
}
