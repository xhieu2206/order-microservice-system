import { Test, TestingModule } from '@nestjs/testing';
import { OrderPaymentController } from './order-payment.controller';
import { OrderService } from '../order/order.service';
import { UpdateOrderStatusDto } from '../order/dto/update-order-status-dto';
import { OrderStatusEnum } from '../enums/enums';

describe('OrderPaymentController', () => {
  let controller: OrderPaymentController;
  const mockOrderService = {
    updateStatus: jest.fn(
      (id: number, updateOrderStatusDto: UpdateOrderStatusDto) => ({
        id: id,
        ...updateOrderStatusDto,
        productName: 'Product 1 Name',
        image: 'Product 1 Image',
        quantity: 1,
        deliveryAddress: 'Address 1',
        customerName: 'Customer Name 1',
        phone: '1234567891',
        email: 'test_email_1@gmail.com',
        createdAt: new Date(),
      }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderPaymentController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue(mockOrderService)
      .compile();

    controller = module.get<OrderPaymentController>(OrderPaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it(`should update order's status of an order has ID equal 1 successfully and return the order`, () => {
    expect(
      controller.updateStatus(1, { status: OrderStatusEnum.CANCELLED }),
    ).resolves.toEqual({
      id: expect.any(Number),
      productName: 'Product 1 Name',
      image: 'Product 1 Image',
      quantity: 1,
      deliveryAddress: 'Address 1',
      customerName: 'Customer Name 1',
      phone: '1234567891',
      email: 'test_email_1@gmail.com',
      createdAt: expect.any(Date),
      status: OrderStatusEnum.CANCELLED,
    });
  });
});
