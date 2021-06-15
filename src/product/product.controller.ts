import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/products')
  getAll(): Promise<Product[]> {
    return this.productService.all();
  }

  @Get('/products/:id')
  get(@Param('id') id: number): Promise<Product> {
    return this.productService.get(id);
  }

  @Post('/categories/:categoryId/products')
  create(
    @Param('categoryId') categoryId: number,
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productService.create(categoryId, createProductDto);
  }
}
