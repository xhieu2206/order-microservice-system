import { Test, TestingModule } from '@nestjs/testing';
import { OrderPaymentController } from './order-payment.controller';

describe('OrderPaymentController', () => {
  let controller: OrderPaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderPaymentController],
    }).compile();

    controller = module.get<OrderPaymentController>(OrderPaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
