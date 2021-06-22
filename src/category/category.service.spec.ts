import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

describe('CategoryService', () => {
  let service: CategoryService;
  let anotherService: CategoryService;
  const mockCategoryRepository = {
    create: jest.fn().mockImplementation((dto: CreateCategoryDto) => dto),
    save: jest.fn().mockImplementation((category) =>
      Promise.resolve({
        id: Date.now(),
        ...category,
      }),
    ),
    findOne: jest.fn().mockImplementation((id: number) =>
      Promise.resolve({
        id: id,
        name: 'Test Category 1',
        brandImage: 'Test Category 1 Image',
        products: [],
      }),
    ),
    find: jest.fn().mockImplementation(() =>
      Promise.resolve([
        {
          id: 1,
          name: 'Test Category 1',
          brandImage: 'Test Category 1 Image',
          products: [],
        },
        {
          id: 2,
          name: 'Test Category 2',
          brandImage: 'Test Category 2 Image',
          products: [],
        },
      ]),
    ),
    remove: jest.fn().mockImplementation(() =>
      Promise.resolve({
        id: 1,
        name: 'Test Category 1',
        brandImage: 'Test Category 1 Image',
        products: [],
      }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(Category),
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it(`should create a new category record successfully and return that`, async () => {
    expect(
      await service.create({
        name: 'Test Category',
        brandImage: 'Test Category 1 Image',
      }),
    ).toEqual({
      id: expect.any(Number),
      name: 'Test Category',
      brandImage: 'Test Category 1 Image',
    });
  });

  it(`should get category wit ID equal 1 successfully and return that category`, async () => {
    expect(await service.get(1)).toEqual({
      id: 1,
      name: 'Test Category 1',
      brandImage: 'Test Category 1 Image',
      products: [],
    });
  });

  it(`should get all the categories and return them correctly`, async () => {
    expect(await service.all()).toEqual([
      {
        id: 1,
        name: 'Test Category 1',
        brandImage: 'Test Category 1 Image',
        products: [],
      },
      {
        id: 2,
        name: 'Test Category 2',
        brandImage: 'Test Category 2 Image',
        products: [],
      },
    ]);
  });

  it(`should remove the category with ID equal 1 and return tat deleted category`, async () => {
    expect(await service.delete(1)).toEqual({
      id: 1,
      name: 'Test Category 1',
      brandImage: 'Test Category 1 Image',
      products: [],
    });
  });

  it(`should not allow to remove the category with ID equal 5, because category with this ID doesn't existed and return the NotFoundException instead`, async () => {
    const anotherMockCategoryRepository = {
      findOne: jest
        .fn()
        .mockImplementation((id: number) => Promise.resolve(null)),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(Category),
          useValue: anotherMockCategoryRepository,
        },
      ],
    }).compile();

    anotherService = module.get<CategoryService>(CategoryService);

    try {
      await anotherService.delete(5);
    } catch (error) {
      expect(error.response).toEqual({
        statusCode: 404,
        message: 'Not Found',
      });
    }
  });
});
