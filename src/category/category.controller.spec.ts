import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('CategoryController', () => {
  let controller: CategoryController;

  const mockCategoryService = {
    create: jest.fn((dto) => {
      return {
        id: 1,
        ...dto,
      };
    }),

    all: jest.fn(() => {
      return [
        {
          id: 1,
          name: 'Testing Brand Name',
          brandImage: 'Testing Brand Image',
        },
        {
          id: 2,
          name: 'Testing Brand Name 2',
          brandImage: 'Testing Brand Image 2',
        },
      ];
    }),

    get: jest.fn(() => {
      return {
        id: 1,
        name: 'Testing Brand Name',
        brandImage: 'Testing Brand Image',
      };
    }),

    delete: jest.fn(() => {
      return {
        id: 1,
        name: 'Testing Brand Name',
        brandImage: 'Testing Brand Image',
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [CategoryService],
    })
      .overrideProvider(CategoryService)
      .useValue(mockCategoryService)
      .compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a category', () => {
    expect(
      controller.create({
        name: 'Testing Brand Name',
        brandImage: 'Testing Brand Image',
      }),
    ).resolves.toEqual({
      id: expect.any(Number),
      name: 'Testing Brand Name',
      brandImage: 'Testing Brand Image',
    });
  });

  it('should get all categories successfully', () => {
    expect(controller.all()).resolves.toEqual([
      {
        id: 1,
        name: 'Testing Brand Name',
        brandImage: 'Testing Brand Image',
      },
      {
        id: 2,
        name: 'Testing Brand Name 2',
        brandImage: 'Testing Brand Image 2',
      },
    ]);
  });

  it('should get the category item with ID equal 1', () => {
    expect(controller.get(1)).resolves.toEqual({
      id: 1,
      name: 'Testing Brand Name',
      brandImage: 'Testing Brand Image',
    });
  });

  it('should delete the category with ID equal 1 successfully', () => {
    expect(controller.delete(1)).toEqual({
      id: 1,
      name: 'Testing Brand Name',
      brandImage: 'Testing Brand Image',
    });
  });
});
