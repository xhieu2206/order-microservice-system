import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ required: true, minLength: 4 })
  @MinLength(4)
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  brandImage: string;
}
