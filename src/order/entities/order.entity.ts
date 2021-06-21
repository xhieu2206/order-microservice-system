import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatusEnum } from '../../enums/enums';
import { IsEnum } from 'class-validator';

@Entity()
export class Order {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ name: 'product_name' })
  productName: string;

  @ApiProperty()
  @Column({ name: 'image' })
  image: string;

  @ApiProperty()
  @Column({ name: 'quantity' })
  quantity: number;

  @ApiProperty()
  @Column({ name: 'delivery_address' })
  deliveryAddress: string;

  @ApiProperty()
  @Column({ name: 'customer_name' })
  customerName: string;

  @ApiProperty()
  @Column({ name: 'phone_number' })
  phone: string;

  @ApiProperty()
  @Column({ name: 'email_address' })
  email: string;

  @ApiProperty()
  @Column({
    name: 'created_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ApiProperty()
  @Column({
    name: 'status',
    default: OrderStatusEnum.CREATED,
    enum: OrderStatusEnum,
  })
  @IsEnum(OrderStatusEnum)
  status: OrderStatusEnum;

  @ApiProperty()
  @Column({ name: 'pin_code', nullable: true })
  pin: number;
}
