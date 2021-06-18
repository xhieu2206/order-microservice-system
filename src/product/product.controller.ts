import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { NotFoundResponse } from '../decorators/common-decorator';

@ApiTags('Product')
@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOkResponse({
    type: Product,
    isArray: true,
    description: 'Return all the products in the system',
  })
  @Get('/products')
  getAll(): Promise<Product[]> {
    return this.productService.all();
  }

  @ApiOkResponse({
    type: Product,
    description: 'Return product by ID',
  })
  @NotFoundResponse()
  @Get('/products/:id')
  get(@Param('id') id: number): Promise<Product> {
    return this.productService.get(id);
  }

  @ApiOkResponse({
    type: Product,
    description: 'Create a new product, must have category ID first',
  })
  @NotFoundResponse()
  @ApiBadRequestResponse({
    description: "One or many fields weren't corrected",
  })
  @ApiParam({ name: 'categoryId', required: true })
  @Post('/categories/:categoryId/products')
  create(
    @Param('categoryId') categoryId: number,
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productService.create(categoryId, createProductDto);
  }
}
