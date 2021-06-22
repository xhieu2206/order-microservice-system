import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderStatusEnum } from '../enums/enums';
import { CreateOrderDto } from './dto/create-order.dto';

describe('OrderService', () => {
  let service: OrderService;
  let anotherService: OrderService;

  const mockOrderRepository = {
    find: jest.fn().mockImplementation(() =>
      Promise.resolve([
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
          status: OrderStatusEnum.CREATED,
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
          status: OrderStatusEnum.CANCELLED,
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
          status: OrderStatusEnum.CANCELLED,
        },
        {
          id: 4,
          productName: 'Product 4 Name',
          image: 'Product 4 Image',
          quantity: 4,
          deliveryAddress: 'Address 4',
          customerName: 'Customer Name 4',
          phone: '1234567894',
          email: 'test_email_4@gmail.com',
          createdAt: new Date(),
          status: OrderStatusEnum.DELIVERED,
        },
      ]),
    ),
    findOne: jest.fn().mockImplementation((id = 1) =>
      Promise.resolve({
        id,
        productName: `Product ${id} Name`,
        image: `Product ${id} Image`,
        quantity: 1,
        deliveryAddress: `Address ${id}`,
        customerName: `Customer Name ${id}`,
        phone: `123456789${id}`,
        email: `test_email_${id}@gmail.com`,
        createdAt: new Date(),
        status: id === 1 ? OrderStatusEnum.CREATED : OrderStatusEnum.CONFIRMED,
      }),
    ),
    create: jest.fn().mockImplementation((dto: CreateOrderDto) =>
      Promise.resolve({
        id: 1,
        ...dto,
        createdAt: new Date(),
        status: OrderStatusEnum.CREATED,
      }),
    ),
    save: jest.fn().mockImplementation((dto: CreateOrderDto) =>
      Promise.resolve({
        id: 1,
        ...dto,
        createdAt: new Date(),
        status: OrderStatusEnum.CREATED,
      }),
    ),
    remove: jest.fn().mockImplementation((order: Order) =>
      Promise.resolve({
        id: 1,
        ...order,
      }),
    ),

    createQueryBuilder: jest.fn().mockImplementation(() => ({
      update: jest.fn().mockImplementation(() => ({
        set: jest.fn().mockImplementation(() => ({
          where: jest.fn().mockImplementation(() => ({
            execute: jest
              .fn()
              .mockImplementation(() => console.log('Executing ...')),
          })),
        })),
      })),
    })),
  };
  const anotherMockOrderRepository = {
    findOne: jest
      .fn()
      .mockImplementation((id: number) => Promise.resolve(null)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Order),
          useValue: mockOrderRepository,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it(`should get all the orders and return them successfully`, async () => {
    expect(await service.all()).toEqual([
      {
        id: expect.any(Number),
        productName: 'Product 1 Name',
        image: 'Product 1 Image',
        quantity: 1,
        deliveryAddress: 'Address 1',
        customerName: 'Customer Name 1',
        phone: '1234567891',
        email: 'test_email_1@gmail.com',
        createdAt: expect.any(Date),
        status: OrderStatusEnum.CREATED,
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
        status: OrderStatusEnum.CANCELLED,
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
        status: OrderStatusEnum.CANCELLED,
      },
      {
        id: 4,
        productName: 'Product 4 Name',
        image: 'Product 4 Image',
        quantity: 4,
        deliveryAddress: 'Address 4',
        customerName: 'Customer Name 4',
        phone: '1234567894',
        email: 'test_email_4@gmail.com',
        createdAt: expect.any(Date),
        status: OrderStatusEnum.DELIVERED,
      },
    ]);
  });

  it(`should get the order that has ID equal 1`, async () => {
    expect(await service.get(1)).toEqual({
      id: expect.any(Number),
      productName: 'Product 1 Name',
      image: 'Product 1 Image',
      quantity: 1,
      deliveryAddress: 'Address 1',
      customerName: 'Customer Name 1',
      phone: '1234567891',
      email: 'test_email_1@gmail.com',
      createdAt: expect.any(Date),
      status: OrderStatusEnum.CREATED,
    });
  });

  it(`should not get the order that has ID equal 5 and return the NotFoundException instead`, async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Order),
          useValue: anotherMockOrderRepository,
        },
      ],
    }).compile();

    anotherService = module.get<OrderService>(OrderService);

    try {
      await anotherService.get(5);
    } catch (err) {
      expect(err.response).toEqual({
        statusCode: 404,
        message: 'Not Found',
      });
    }
  });

  it(`should create an order and return it`, async () => {
    expect(
      await service.create({
        productName: 'Product 1 Name',
        image: 'Product 1 Image',
        quantity: 1,
        deliveryAddress: 'Address 1',
        customerName: 'Customer Name 1',
        phone: '1234567891',
        email: 'test_email_1@gmail.com',
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
      status: OrderStatusEnum.CREATED,
    });
  });

  it(`should update status of an order has ID equal 1 and return it`, async () => {
    expect(
      await service.update(1, {
        productName: 'Product 1 Name',
        quantity: 1,
        deliveryAddress: 'Address 1',
        customerName: 'Customer Name 1',
        phone: '1234567891',
        email: 'test_email_1@gmail.com',
        status: OrderStatusEnum.CANCELLED,
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
      status: OrderStatusEnum.CREATED,
    });
  });

  it(`should not allow to update order's status to ${OrderStatusEnum.CREATED}`, async () => {
    try {
      await service.update(1, {
        productName: 'Product 1 Name',
        quantity: 1,
        deliveryAddress: 'Address 1',
        customerName: 'Customer Name 1',
        phone: '1234567891',
        email: 'test_email_1@gmail.com',
        status: OrderStatusEnum.CREATED,
      });
    } catch (err) {
      expect(err.response).toEqual({ statusCode: 400, message: 'Bad Request' });
    }
  });

  it(`should update an order's status of order that has ID equal 2 from "CONFIRMED" to "CANCELLED"`, async () => {
    expect(
      await service.updateStatus(2, {
        status: OrderStatusEnum.CANCELLED,
      }),
    ).toEqual({
      id: expect.any(Number),
      productName: 'Product 2 Name',
      image: 'Product 2 Image',
      quantity: 1,
      deliveryAddress: 'Address 2',
      customerName: 'Customer Name 2',
      phone: '1234567892',
      email: 'test_email_2@gmail.com',
      createdAt: expect.any(Date),
      status: OrderStatusEnum.CREATED,
    });
  });

  it(`should delete an order that has ID equal 1 successfully and return it`, async () => {
    expect(await service.delete(1)).toEqual({
      id: 1,
      productName: 'Product 1 Name',
      image: 'Product 1 Image',
      quantity: 1,
      deliveryAddress: 'Address 1',
      customerName: 'Customer Name 1',
      phone: '1234567891',
      email: 'test_email_1@gmail.com',
      createdAt: expect.any(Date),
      status: OrderStatusEnum.CREATED,
    });
  });

  it(`should update the order's status from "${OrderStatusEnum.CONFIRMED}" to "${OrderStatusEnum.DELIVERED}" successfully`, async () => {
    await service.updateConfirmedOrderStatus();
    expect(mockOrderRepository.createQueryBuilder).toHaveBeenCalled();
  });
});
