import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { OrderModule } from '../order/order.module';

@Module({
  providers: [TaskService],
  imports: [OrderModule],
})
export class TaskModule {}
