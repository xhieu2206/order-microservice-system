import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../category/entities/category.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async all(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async create(
    categoryId: number,
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    const category = await this.categoryRepository.findOne(categoryId);
    const product = this.productRepository.save({
      name: createProductDto.name,
      image: createProductDto.image,
      description: createProductDto.description,
      category: category,
    });
    return product;
  }

  async get(id): Promise<Product> {
    return this.productRepository.findOne(id);
  }
}
