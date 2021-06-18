import { Module } from '@nestjs/common';
import { OrderPaymentController } from './order-payment.controller';
import { OrderModule } from '../order/order.module';

@Module({
  controllers: [OrderPaymentController],
  imports: [OrderModule],
})
export class OrderPaymentModule {}
