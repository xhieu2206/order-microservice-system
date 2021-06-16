import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
  Put,
  UseGuards, BadRequestException, NotFoundException,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiBadRequestResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(
    private orderService: OrderService,
    @Inject('ORDER_SERVICE') private readonly client: ClientProxy,
  ) {}

  @ApiOkResponse({
    type: Order,
    isArray: true,
    description:
      'API to get all the orders in the system, authorization needed',
  })
  @ApiHeader({
    name: 'Authorization',
    example: 'Bearer {token}',
  })
  @ApiUnauthorizedResponse({
    description: 'Missing or wrong access token',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  all(): Promise<Order[]> {
    return this.orderService.all();
  }

  @ApiOkResponse({
    type: Order,
    description:
      'API to create a Order, return created Order, authorization needed',
  })
  @ApiUnauthorizedResponse({
    description: 'Missing or wrong access token',
  })
  @ApiBadRequestResponse({
    description: 'Data of the order were not correct',
  })
  @ApiHeader({
    name: 'Authorization',
    example: 'Bearer {token}',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    const newOrder = await this.orderService.create(createOrderDto);
    if (!newOrder) {
      throw new BadRequestException();
    }
    this.client.emit('order_created', newOrder);
    return newOrder;
  }

  @ApiOkResponse({
    type: Order,
    description: 'API to get a Order detail, authentication required',
  })
  @ApiUnauthorizedResponse({
    description: 'Missing or wrong access token',
  })
  @ApiNotFoundResponse({
    description: "Order with this ID doesn't exited",
  })
  @ApiHeader({
    name: 'Authorization',
    example: 'Bearer {token}',
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Param('id') id: number): Promise<Order> {
    const order = await this.orderService.get(id);
    if (!order) {
      throw new NotFoundException();
    }
    return order;
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.orderService.update(id, updateOrderDto);
  }

  @ApiOkResponse({
    type: Order,
    description: 'API to delete a Order detail by ID, authentication required',
  })
  @ApiHeader({
    name: 'Authorization',
    example: 'Bearer {token}',
  })
  @ApiUnauthorizedResponse({
    description: 'Missing or wrong access token',
  })
  @ApiNotFoundResponse({
    description: "Order with this ID doesn't exited",
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Order> {
    const order = await this.orderService.delete(id);
    if (!order) {
      throw new NotFoundException();
    }
    return order;
  }
}
