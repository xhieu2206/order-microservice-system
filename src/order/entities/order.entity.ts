import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'product_name' })
  productName: string;

  @Column({ name: 'image' })
  image: string;

  @Column({ name: 'quantity' })
  quantity: number;

  @Column({ name: 'delivery_address' })
  deliveryAddress: string;

  @Column({ name: 'customer_name' })
  customerName: string;

  @Column({ name: 'phone_number' })
  phone: string;

  @Column({ name: 'email_address' })
  email: string;

  @Column({
    name: 'created_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({ name: 'status', default: 'created' })
  status: string;

  @Column({ name: 'pin_code', nullable: true })
  pin: number;
}
