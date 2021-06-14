import { MinLength } from 'class-validator';

export class CreateCategoryDto {
  @MinLength(4)
  name: string;

  brandImage: string;
}
