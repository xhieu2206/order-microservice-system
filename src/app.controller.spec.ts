import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

describe('AppController', () => {
  let appController: AppController;
  const mockAuthService = {
    login: jest.fn(() => ({
      access_token: 'Mock Token',
      user: {
        id: 1,
        name: 'Admin',
        username: 'admin',
        email: 'admin@gmail.com.vn',
      },
    })),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    appController = app.get<AppController>(AppController);
  });

  it(`should login user successfully and return the access_token with user's information`, () => {
    expect(
      appController.login(
        {
          user: {
            id: 1,
            name: 'Admin',
            username: 'admin',
            password: 'password',
            email: 'admin@gmail.com.vn',
          },
        },
        {
          username: 'admin',
          password: 'password',
        },
      ),
    ).toEqual({
      access_token: expect.any(String),
      user: {
        id: 1,
        name: 'Admin',
        username: 'admin',
        email: 'admin@gmail.com.vn',
      },
    });
  });
});
