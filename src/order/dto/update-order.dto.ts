import {
  IsAlphanumeric,
  IsEmail,
  IsIn,
  IsMobilePhone,
  IsOptional,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateOrderDto {
  @MinLength(3)
  productName: string;

  @Min(1)
  quantity: number;

  @MinLength(5)
  deliveryAddress: string;

  @IsAlphanumeric()
  @MinLength(5)
  customerName: string;

  @IsMobilePhone()
  phone: string;

  @IsEmail()
  email: string;

  @IsIn(['created', 'confirmed', 'cancelled', 'delivered'])
  status: string;

  @IsOptional()
  pin?: number;
}
