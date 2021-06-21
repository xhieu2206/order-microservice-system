import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from '../category/entities/category.entity';
import { CreateProductDto } from './dto/create-product.dto';

describe('ProductService', () => {
  let service: ProductService;
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

  const mockCategoryRepository = {
    findOne: jest.fn().mockImplementation((categoryId: number) =>
      Promise.resolve({
        id: 1,
        name: 'Test Category 1',
        brandImage: 'Test Category 1 Image',
      }),
    ),
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
});
