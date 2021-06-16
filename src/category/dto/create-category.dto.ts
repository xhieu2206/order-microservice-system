import { MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @MinLength(4)
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  brandImage: string;
}
