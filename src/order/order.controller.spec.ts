import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatusEnum } from '../enums/enums';

describe('OrderController', () => {
  let controller: OrderController;
  let client: ClientProxy;
  const mockOrderService = {
    all: jest.fn(() => [
      {
        id: 1,
        productName: 'Product 1 Name',
        image: 'Product 1 Image',
        quantity: 1,
        deliveryAddress: 'Address 1',
        customerName: 'Customer Name 1',
        phone: '1234567891',
        email: 'test_email_1@gmail.com',
        createdAt: new Date(),
        status: 'created',
      },
      {
        id: 2,
        productName: 'Product 2 Name',
        image: 'Product 2 Image',
        quantity: 2,
        deliveryAddress: 'Address 2',
        customerName: 'Customer Name 2',
        phone: '1234567892',
        email: 'test_email_2@gmail.com',
        createdAt: new Date(),
        status: 'cancelled',
      },
      {
        id: 3,
        productName: 'Product 3 Name',
        image: 'Product 3 Image',
        quantity: 3,
        deliveryAddress: 'Address 3',
        customerName: 'Customer Name 3',
        phone: '1234567893',
        email: 'test_email_3@gmail.com',
        createdAt: new Date(),
        status: 'delivered',
      },
    ]),
    get: jest.fn((id: number) => ({
      id,
      productName: 'Product 1 Name',
      image: 'Product 1 Image',
      quantity: 1,
      deliveryAddress: 'Address 1',
      customerName: 'Customer Name 1',
      phone: '1234567891',
      email: 'test_email_1@gmail.com',
      createdAt: new Date(),
      status: 'created',
    })),
    create: jest.fn((dto: CreateOrderDto) => ({
      id: 1,
      ...dto,
      createdAt: new Date(),
      status: 'created',
    })),
    update: jest.fn((id: number, dto: UpdateOrderDto) => ({
      id,
      ...dto,
      productName: 'Product 1 Name',
      image: 'Product 1 Image',
      quantity: 1,
      deliveryAddress: 'Address 1',
      customerName: 'Customer Name 1',
      phone: '1234567891',
      email: 'test_email_1@gmail.com',
      createdAt: new Date(),
    })),
    delete: jest.fn((id: number) => ({
      id,
      productName: 'Product 1 Name',
      image: 'Product 1 Image',
      quantity: 1,
      deliveryAddress: 'Address 1',
      customerName: 'Customer Name 1',
      phone: '1234567891',
      email: 'test_email_1@gmail.com',
      createdAt: new Date(),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        OrderService,
        {
          provide: 'ORDER_SERVICE',
          useValue: {
            emit: jest.fn(),
          },
        },
      ],
    })
      .overrideProvider(OrderService)
      .useValue(mockOrderService)
      .compile();

    controller = module.get<OrderController>(OrderController);
    client = module.get<ClientProxy>('ORDER_SERVICE');
  });

  it(`should return all the orders`, () => {
    expect(controller.all()).toEqual([
      {
        id: 1,
        productName: 'Product 1 Name',
        image: 'Product 1 Image',
        quantity: 1,
        deliveryAddress: 'Address 1',
        customerName: 'Customer Name 1',
        phone: '1234567891',
        email: 'test_email_1@gmail.com',
        createdAt: expect.any(Date),
        status: 'created',
      },
      {
        id: 2,
        productName: 'Product 2 Name',
        image: 'Product 2 Image',
        quantity: 2,
        deliveryAddress: 'Address 2',
        customerName: 'Customer Name 2',
        phone: '1234567892',
        email: 'test_email_2@gmail.com',
        createdAt: expect.any(Date),
        status: 'cancelled',
      },
      {
        id: 3,
        productName: 'Product 3 Name',
        image: 'Product 3 Image',
        quantity: 3,
        deliveryAddress: 'Address 3',
        customerName: 'Customer Name 3',
        phone: '1234567893',
        email: 'test_email_3@gmail.com',
        createdAt: expect.any(Date),
        status: 'delivered',
      },
    ]);
  });

  it(`should get the order with ID equal to 1`, () => {
    expect(controller.get(1)).toEqual({
      id: expect.any(Number),
      productName: 'Product 1 Name',
      image: 'Product 1 Image',
      quantity: 1,
      deliveryAddress: 'Address 1',
      customerName: 'Customer Name 1',
      phone: '1234567891',
      email: 'test_email_1@gmail.com',
      createdAt: expect.any(Date),
      status: 'created',
    });
  });

  it(`should create a new order and return the created order`, () => {
    expect(
      controller.create({
        productName: 'Product 1 Name',
        image: 'Product 1 Image',
        quantity: 1,
        deliveryAddress: 'Address 1',
        customerName: 'Customer Name 1',
        phone: '1234567891',
        email: 'test_email_1@gmail.com',
      }),
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
      status: 'created',
    });
  });

  it(`should update an order status that has ID equal 1 and return the updated order`, () => {
    expect(
      controller.update(1, {
        productName: 'Product 1 Name',
        quantity: 1,
        deliveryAddress: 'Address 1',
        customerName: 'Customer Name 1',
        phone: '1234567891',
        email: 'test_email_1@gmail.com',
        status: OrderStatusEnum.CONFIRMED,
      }),
    ).toEqual({
      id: expect.any(Number),
      productName: 'Product 1 Name',
      image: 'Product 1 Image',
      quantity: 1,
      deliveryAddress: 'Address 1',
      customerName: 'Customer Name 1',
      phone: '1234567891',
      email: 'test_email_1@gmail.com',
      createdAt: expect.any(Date),
      status: OrderStatusEnum.CONFIRMED,
    });
  });

  it(`should delete the order that has ID equal 1 and return the removed order`, () => {
    expect(controller.delete(1)).toEqual({
      id: expect.any(Number),
      productName: 'Product 1 Name',
      image: 'Product 1 Image',
      quantity: 1,
      deliveryAddress: 'Address 1',
      customerName: 'Customer Name 1',
      phone: '1234567891',
      email: 'test_email_1@gmail.com',
      createdAt: expect.any(Date),
    });
  });
});
