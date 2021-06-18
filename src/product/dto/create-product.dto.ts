import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    required: true,
    description: 'Prefilled in the BE by product item',
    minLength: 3,
  })
  @MinLength(3)
  name: string;

  @ApiProperty({
    required: true,
    description: 'Prefilled in the BE by product item',
  })
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    required: true,
    description: 'Prefilled in the BE by product item',
  })
  @IsNotEmpty()
  description: string;
}
