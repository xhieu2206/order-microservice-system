import { ApiProperty } from '@nestjs/swagger';
import { OrderStatusEnum } from '../../enums/enums';
import { IsEnum, IsNumber } from 'class-validator';

export class UpdateOrderStatusDto {
  @ApiProperty({
    required: true,
    description: `Accept one one of there value: "created", "confirmed", "cancelled", "delivered"`,
    type: OrderStatusEnum,
    enumName: 'OrderStatusEnum',
    enum: OrderStatusEnum,
  })
  @IsEnum(OrderStatusEnum)
  status: string;

  @ApiProperty({
    required: false,
  })
  @IsNumber()
  pin?: number | null;
}
