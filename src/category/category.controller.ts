import {BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import {ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags} from '@nestjs/swagger';

@ApiTags('Category')
@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @ApiCreatedResponse({
    type: Category,
    description: 'API to create a new Category, return the created Category',
  })
  @ApiBadRequestResponse({
    description: 'One of the field is not correct',
  })
  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoryService.create(createCategoryDto);
    if (!category) {
      throw new BadRequestException();
    }
    return category;
  }

  @ApiOkResponse({
    type: Category,
    isArray: true,
    description: 'API to list all categories in the system',
  })
  @ApiNotFoundResponse({
    description: 'No categories were found',
  })
  @Get()
  async all(): Promise<Category[]> {
    const categories = await this.categoryService.all();
    if (categories.length === 0) {
      throw new NotFoundException()
    }
    return categories;
  }

  @ApiOkResponse({ type: Category, description: 'API to get category by ID' })
  @ApiNotFoundResponse({
    description: "Category with this ID doesn't exited",
  })
  @Get(':id')
  async get(@Param('id') id: number): Promise<Category> {
    const category = await this.categoryService.get(id);
    if (!category) {
      throw new NotFoundException();
    }
    return category;
  }

  @ApiOkResponse({
    type: Category,
    description: 'API to delete a category by ID',
  })
  @ApiNotFoundResponse({
    description: "Category with this ID doesn't exited",
  })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Category> {
    const category = await this.categoryService.delete(id);
    if (!category) {
      throw new NotFoundException();
    }
    return category;
  }
}
