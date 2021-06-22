import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status-dto';
import { orderStatusUpdateValidation } from '../../utils/utils';
import { OrderStatusEnum } from '../enums/enums';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  all(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async get(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne(id);
    if (!order) {
      throw new NotFoundException();
    }
    return order;
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const newOrder = await this.orderRepository.create({ ...createOrderDto });
    return this.orderRepository.save(newOrder);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    let updateOrder = await this.get(id);
    if (
      !orderStatusUpdateValidation(updateOrder.status, updateOrderDto.status)
    ) {
      throw new BadRequestException();
    }
    updateOrder = {
      ...updateOrder,
      ...updateOrderDto,
    };
    return this.orderRepository.save(updateOrder);
  }

  async updateStatus(
    id: number,
    updateOrderStatusDto: UpdateOrderStatusDto,
  ): Promise<Order> {
    let updateOrder = await this.get(id);
    updateOrder = {
      ...updateOrder,
      ...updateOrderStatusDto,
    };
    return this.orderRepository.save(updateOrder);
  }

  async delete(id: number): Promise<Order> {
    const removeOrder = await this.get(id);
    return this.orderRepository.remove(removeOrder);
  }

  async updateConfirmedOrderStatus() {
    await this.orderRepository
      .createQueryBuilder()
      .update(Order)
      .set({ status: OrderStatusEnum.DELIVERED })
      .where('status = :status', { status: 'confirmed' })
      .execute();
  }
}
