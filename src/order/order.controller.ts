import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UpdateResult } from 'typeorm';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  all(): Promise<Order[]> {
    return this.orderService.all();
  }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(createOrderDto);
  }

  @Get(':id')
  get(@Param('id') id: number): Promise<Order> {
    return this.orderService.get(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<Order> {
    return this.orderService.delete(id);
  }
}
