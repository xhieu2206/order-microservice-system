import { Body, Controller, Param, Patch } from '@nestjs/common';
import { OrderService } from '../order/order.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { Order } from '../order/entities/order.entity';
import { UpdateOrderStatusDto } from '../order/dto/update-order-status-dto';
import { NotFoundResponse } from '../decorators/common-decorator';

@Controller('order-payment')
export class OrderPaymentController {
  constructor(private orderService: OrderService) {}

  @ApiOkResponse({
    type: Order,
    description:
      "API to update a Order's status, used to call from Payment App",
  })
  @NotFoundResponse()
  @Patch(':id')
  async updateStatus(
    @Param('id') id: number,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ): Promise<Order> {
    return this.orderService.updateStatus(id, updateOrderStatusDto);
  }
}
