import {
  IsEmail,
  IsMobilePhone, IsNotEmpty,
  IsOptional,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatusFieldRequest } from '../../decorators/common-decorator';
import { OrderStatusEnum } from '../../enums/enums';

export class UpdateOrderDto {
  @ApiProperty({
    required: true,
    description: 'Not required, but pre-filled in the FE with Product item',
    minLength: 3,
  })
  @MinLength(3)
  @IsNotEmpty()
  productName: string;

  @ApiProperty({ required: true, minimum: 1 })
  @Min(1)
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    required: true,
    description: 'Delivery Address, min 5 characters',
    minLength: 5,
  })
  @MinLength(5)
  @IsNotEmpty()
  deliveryAddress: string;

  @ApiProperty({ required: true, minLength: 5 })
  @MinLength(5)
  @IsNotEmpty()
  customerName: string;

  @ApiProperty({
    required: true,
    description: 'Must be a correct mobile phone number',
  })
  @IsMobilePhone()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    required: true,
    description: 'Must be a correct email address',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @OrderStatusFieldRequest()
  status: OrderStatusEnum;

  @IsOptional()
  pin?: number;
}
