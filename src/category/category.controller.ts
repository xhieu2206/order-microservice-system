import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  async all(): Promise<Category[]> {
    return this.categoryService.all();
  }

  @Get(':id')
  async get(@Param('id') id: number): Promise<Category> {
    return this.categoryService.get(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Category> {
    return this.categoryService.delete(id);
  }
}
