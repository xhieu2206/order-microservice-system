import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OrderService } from '../order/order.service';

@Injectable()
export class TaskService {
  constructor(private readonly orderService: OrderService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    await this.orderService.updateConfirmedOrderStatus();
  }
}
