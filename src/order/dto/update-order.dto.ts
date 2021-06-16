import {
  IsEmail,
  IsIn,
  IsMobilePhone,
  IsOptional,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto {
  @ApiProperty({
    required: true,
    description: 'Not required, but pre-filled in the FE with Product item',
  })
  @MinLength(3)
  productName: string;

  @ApiProperty({ required: true, minimum: 1 })
  @Min(1)
  quantity: number;

  @ApiProperty({
    required: true,
    description: 'Delivery Address, min 5 characters',
    minLength: 5,
  })
  @MinLength(5)
  deliveryAddress: string;

  @ApiProperty({ required: true, minLength: 5 })
  @MinLength(5)
  customerName: string;

  @ApiProperty({
    required: true,
    description: 'Must be a correct mobile phone number',
  })
  @IsMobilePhone()
  phone: string;

  @ApiProperty({
    required: true,
    description: 'Must be a correct email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    description: `Accept one one of there value: "created", "confirmed", "cancelled", "delivered"`,
  })
  @IsIn(['created', 'confirmed', 'cancelled', 'delivered'])
  status: string;

  @IsOptional()
  pin?: number;
}
