import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async all(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async get(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne(id);
    return order;
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const newOrder = await this.orderRepository.create({ ...createOrderDto });
    return this.orderRepository.save(newOrder);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    let updateOrder = await this.orderRepository.findOne(id);
    updateOrder = {
      ...updateOrder,
      ...updateOrderDto,
    };
    return this.orderRepository.save(updateOrder);
  }

  async delete(id: number): Promise<Order> {
    const removeOrder = await this.orderRepository.findOne(id);
    return this.orderRepository.remove(removeOrder);
  }
}
