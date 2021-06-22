import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  const mockUserService = {
    findOne: jest.fn((username: string) => ({
      id: 1,
      name: 'Admin',
      username: username,
      password: 'password',
      email: 'admin@gmail.com.vn',
    })),
  };
  const mockJwtService = {
    sign: jest.fn((payload) => 'Mock Token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersService, JwtService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .overrideProvider(JwtService)
      .useValue(mockJwtService)
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it(`should retrieve user's information of user that has username was "admin"`, () => {
    expect(service.validateUser('admin', 'password')).resolves.toEqual({
      id: 1,
      name: 'Admin',
      username: 'admin',
      password: 'password',
      email: 'admin@gmail.com.vn',
    });
  });

  it(`should call the login method and return the access_token and user information successfully`, () => {
    expect(
      service.login({
        id: 1,
        name: 'Admin',
        username: 'admin',
        password: 'password',
        email: 'admin@gmail.com.vn',
      }),
    ).toEqual({
      access_token: 'Mock Token',
      user: {
        id: 1,
        name: 'Admin',
        username: 'admin',
        email: 'admin@gmail.com.vn',
      },
    });
  });
});
