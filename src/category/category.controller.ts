import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NotFoundResponse } from '../decorators/common-decorator';

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
    return this.categoryService.create(createCategoryDto);
  }

  @ApiOkResponse({
    type: Category,
    isArray: true,
    description: 'API to list all categories in the system',
  })
  @Get()
  async all(): Promise<Category[]> {
    return this.categoryService.all();
  }

  @ApiOkResponse({ type: Category, description: 'API to get category by ID' })
  @NotFoundResponse()
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
  @NotFoundResponse()
  @Delete(':id')
  delete(@Param('id') id: number): Promise<Category> {
    return this.categoryService.delete(id);
  }
}
