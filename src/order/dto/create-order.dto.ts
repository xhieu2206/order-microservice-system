import {
  IsAlphanumeric,
  IsEmail,
  IsMobilePhone,
  Min,
  MinLength,
} from 'class-validator';

export class CreateOrderDto {
  @MinLength(3)
  productName: string;

  image: string;

  @Min(1)
  quantity: number;

  @MinLength(5)
  deliveryAddress: string;

  @MinLength(5)
  customerName: string;

  @IsMobilePhone()
  phone: string;

  @IsEmail()
  email: string;
}
