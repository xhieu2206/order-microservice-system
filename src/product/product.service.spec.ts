import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from '../category/entities/category.entity';
import { CreateProductDto } from './dto/create-product.dto';

describe('ProductService', () => {
  let service: ProductService;
  let exceptionService: ProductService;

  const mockProductRepository = {
    findOne: jest.fn().mockImplementation((id: number) =>
      Promise.resolve({
        id: id,
        name: 'Test Product 1',
        image: 'Test Product 1 Image',
        description: 'Test Product 1 Description',
      }),
    ),
    find: jest.fn().mockImplementation(() =>
      Promise.resolve([
        {
          id: 1,
          name: 'Test Product 1',
          image: 'Test Product 1 Image',
          description: 'Test Product 1 Description',
        },
        {
          id: 2,
          name: 'Test Product 2',
          image: 'Test Product 2 Image',
          description: 'Test Product 2 Description',
        },
        {
          id: 3,
          name: 'Test Product 3',
          image: 'Test Product 3 Image',
          description: 'Test Product 3 Description',
        },
      ]),
    ),
    save: jest.fn().mockImplementation((dto: CreateProductDto, category: any) =>
      Promise.resolve({
        id: 1,
        ...dto,
        ...category,
      }),
    ),
  };
  const exceptionMockProductRepository = {
    findOne: jest
      .fn()
      .mockImplementation((id: number) => Promise.resolve(null)),
  };

  const mockCategoryRepository = {
    findOne: jest.fn().mockImplementation((categoryId: number) =>
      Promise.resolve({
        id: 1,
        name: 'Test Category 1',
        brandImage: 'Test Category 1 Image',
      }),
    ),
  };

  const exceptionMockCategoryRepository = {
    findOne: jest
      .fn()
      .mockImplementation((id: number) => Promise.resolve(null)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
        {
          provide: getRepositoryToken(Category),
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it(`should get product with ID equal 1 and return it`, async () => {
    expect(await service.get(1)).toEqual({
      id: 1,
      name: 'Test Product 1',
      image: 'Test Product 1 Image',
      description: 'Test Product 1 Description',
    });
  });

  it(`should not get the product with ID equal to 5 because the product with this ID doesn't existed and return NotFoundException instead`, async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: exceptionMockProductRepository,
        },
        {
          provide: getRepositoryToken(Category),
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();

    exceptionService = module.get<ProductService>(ProductService);

    try {
      await exceptionService.get(5);
    } catch (error) {
      expect(error.response).toEqual({
        statusCode: 404,
        message: 'Not Found',
      });
    }
  });

  it(`should get all products and return them`, async () => {
    expect(await service.all()).toEqual([
      {
        id: 1,
        name: 'Test Product 1',
        image: 'Test Product 1 Image',
        description: 'Test Product 1 Description',
      },
      {
        id: 2,
        name: 'Test Product 2',
        image: 'Test Product 2 Image',
        description: 'Test Product 2 Description',
      },
      {
        id: 3,
        name: 'Test Product 3',
        image: 'Test Product 3 Image',
        description: 'Test Product 3 Description',
      },
    ]);
  });

  it(`should create a new product successfully and return it`, async () => {
    expect(
      await service.create(1, {
        name: 'Test Product 1',
        image: 'Test Product 1 Image',
        description: 'Test Product 1 Description',
      }),
    ).toEqual({
      id: 1,
      name: 'Test Product 1',
      image: 'Test Product 1 Image',
      description: 'Test Product 1 Description',
      category: {
        id: 1,
        name: 'Test Category 1',
        brandImage: 'Test Category 1 Image',
      },
    });
  });

  it(`should not allow to create a new product with category that doesn't existed and return NotFoundException instead (example category ID is 5)`, async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
        {
          provide: getRepositoryToken(Category),
          useValue: exceptionMockCategoryRepository,
        },
      ],
    }).compile();

    exceptionService = module.get<ProductService>(ProductService);

    try {
      await exceptionService.create(5, {
        name: 'Test Product 1',
        image: 'Test Product 1 Image',
        description: 'Test Product 1 Description',
      });
    } catch (error) {
      expect(error.response).toEqual({
        statusCode: 404,
        message: 'Not Found',
      });
    }
  });
});
