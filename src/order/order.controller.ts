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
import { CommonErrorAuthorizationResponse } from '../decorators/common-decorator';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NotFoundResponse } from '../decorators/common-decorator';

@ApiTags('Orders')
@Controller('orders')
@UseGuards(JwtAuthGuard)
@CommonErrorAuthorizationResponse()
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
  @Get()
  all(): Promise<Order[]> {
    return this.orderService.all();
  }

  @ApiOkResponse({
    type: Order,
    description:
      'API to create a Order, return created Order, authorization needed',
  })
  @ApiBadRequestResponse({
    description: "Data of the order weren't correct",
  })
  @ApiBearerAuth()
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    const newOrder = await this.orderService.create(createOrderDto);
    this.client.emit('order_created', newOrder);
    return newOrder;
  }

  @ApiOkResponse({
    type: Order,
    description: 'API to get a Order detail, authentication required',
  })
  @NotFoundResponse()
  @Get(':id')
  get(@Param('id') id: number): Promise<Order> {
    return this.orderService.get(id);
  }

  @ApiOkResponse({
    type: Order,
    description: 'API to update a Order detail, authentication required',
  })
  @NotFoundResponse()
  @ApiBadRequestResponse({
    description:
      "Error happened if trying to update order's status of a delivered or cancelled order",
  })
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
  @NotFoundResponse()
  @Delete(':id')
  delete(@Param('id') id: number): Promise<Order> {
    return this.orderService.delete(id);
  }
}
