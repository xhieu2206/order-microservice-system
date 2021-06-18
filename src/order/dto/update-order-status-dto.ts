import { ApiProperty } from '@nestjs/swagger';
import { OrderStatusFieldRequest } from '../../decorators/common-decorator';
import { OrderStatusEnum } from '../../enums/enums';

export class UpdateOrderStatusDto {
  @OrderStatusFieldRequest()
  status: OrderStatusEnum;

  @ApiProperty({
    required: false,
    type: Number,
    nullable: true,
  })
  pin?: number;
}
