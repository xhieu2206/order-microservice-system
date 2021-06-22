import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { NotFoundException } from '@nestjs/common';

describe('CategoryController', () => {
  let controller: CategoryController;
  let anotherController: CategoryController;

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

  it(`should return a NotFoundException if trying to get the order with non-existed ID, example category with ID equal 5`, async () => {
    const anotherMockCategoryService = {
      get: jest.fn(() => {
        return null;
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [CategoryService],
    })
      .overrideProvider(CategoryService)
      .useValue(anotherMockCategoryService)
      .compile();

    anotherController = module.get<CategoryController>(CategoryController);

    try {
      await anotherController.get(1);
    } catch (err) {
      expect(err.response).toEqual({
        statusCode: 404,
        message: 'Not Found',
      });
    }
  });

  it('should delete the category with ID equal 1 successfully', () => {
    expect(controller.delete(1)).toEqual({
      id: 1,
      name: 'Testing Brand Name',
      brandImage: 'Testing Brand Image',
    });
  });
});
