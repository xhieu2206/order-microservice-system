import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { OrderService } from '../order/order.service';

describe('TaskService', () => {
  let service: TaskService;
  const mockOrderService = {
    updateConfirmedOrderStatus: jest.fn(function () {
      console.log(`Updating confirmed order's status ...`);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService, OrderService],
    })
      .overrideProvider(OrderService)
      .useValue(mockOrderService)
      .compile();

    service = module.get<TaskService>(TaskService);
  });

  it(`should call the "updateConfirmedOrderStatus" in handleCron method`, () => {
    service.handleCron();
    expect(mockOrderService.updateConfirmedOrderStatus).toHaveBeenCalled();
  });
});
