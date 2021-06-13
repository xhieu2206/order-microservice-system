import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OrderService } from '../order/order.service';

@Injectable()
export class TaskService {
  constructor(private readonly orderService: OrderService) {}
  private readonly logger = new Logger(TaskService.name);

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    await this.orderService.updateConfirmedOrderStatus();
  }
}
