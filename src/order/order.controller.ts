import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
  Put,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orders')
export class OrderController {
  constructor(
    private orderService: OrderService,
    @Inject('ORDER_SERVICE') private readonly client: ClientProxy,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  all(): Promise<Order[]> {
    return this.orderService.all();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    const newOrder = await this.orderService.create(createOrderDto);
    this.client.emit('order_created', newOrder);
    return newOrder;
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number): Promise<Order> {
    return this.orderService.delete(id);
  }
}
