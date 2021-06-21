import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

describe('ProductController', () => {
  let controller: ProductController;
  const mockProductService = {
    get: jest.fn((id: number) => {
      return {
        id: id,
        name: 'Test Product 1',
        image: 'Test Product 1 Image',
      };
    }),
    all: jest.fn(() => [
      {
        id: 1,
        name: 'Test Product 1',
        image: 'Test Product 1 Image',
      },
      {
        id: 2,
        name: 'Test Product 2',
        image: 'Test Product 2 Image',
      },
      {
        id: 3,
        name: 'Test Product 3',
        image: 'Test Product 3 Image',
      },
    ]),
    create: jest.fn(
      (categoryId: number, createProductDto: CreateProductDto) => ({
        id: 1,
        categoryId: categoryId,
        ...createProductDto,
      }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    })
      .overrideProvider(ProductService)
      .useValue(mockProductService)
      .compile();

    controller = module.get<ProductController>(ProductController);
  });

  it(`should return the product with ID equal 1`, () => {
    expect(controller.get(1)).toEqual({
      id: 1,
      name: 'Test Product 1',
      image: 'Test Product 1 Image',
    });
  });

  it(`should return all the products`, () => {
    expect(controller.getAll()).toEqual([
      {
        id: 1,
        name: 'Test Product 1',
        image: 'Test Product 1 Image',
      },
      {
        id: 2,
        name: 'Test Product 2',
        image: 'Test Product 2 Image',
      },
      {
        id: 3,
        name: 'Test Product 3',
        image: 'Test Product 3 Image',
      },
    ]);
  });

  it(`should create a new Product successfully and return it`, () => {
    expect(
      controller.create(1, {
        name: 'Test Product 1',
        image: 'Test Product 1 Image',
        description: 'Test Product 1 Description',
      }),
    ).toEqual({
      id: expect.any(Number),
      name: 'Test Product 1',
      image: 'Test Product 1 Image',
      description: 'Test Product 1 Description',
      categoryId: 1,
    });
  });
});
