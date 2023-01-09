import { Body, Controller, Post } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';

@Controller('rabbitmq')
export class RabbitmqController {

  constructor(private service: RabbitmqService){}

  @Post()
  create(@Body() message: any) {
    this.service.sendToRabbitMQ(message.name);
  }
}
