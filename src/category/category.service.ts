import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async get(id: number): Promise<Category> {
    return this.categoryRepository.findOne(id, {
      relations: ['products'],
    });
  }

  async all(): Promise<Category[]> {
    return this.categoryRepository.find({
      relations: ['products'],
    });
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const newCategory = await this.categoryRepository.create({
      ...createCategoryDto,
    });
    return this.categoryRepository.save(newCategory);
  }

  async delete(id: number): Promise<Category> {
    const deleteCategory = await this.get(id);
    if (!deleteCategory) {
      throw new NotFoundException();
    }
    return this.categoryRepository.remove(deleteCategory);
  }
}
