import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Inject, Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('orders')
export class OrderController {
  constructor(
    private orderService: OrderService,
    @Inject('ORDER_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get()
  all(): Promise<Order[]> {
    return this.orderService.all();
  }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    const newOrder = await this.orderService.create(createOrderDto);
    this.client.emit('order_created', newOrder);
    return newOrder;
  }

  @Get(':id')
  get(@Param('id') id: number): Promise<Order> {
    return this.orderService.get(id);
  }

  @Put(':id')
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
