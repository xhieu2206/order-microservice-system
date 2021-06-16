import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
  email: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      name: 'Admin',
      username: 'admin',
      password: 'password',
      email: 'admin@gmail.com.vn',
    },
    {
      id: 2,
      name: 'Member',
      username: 'member',
      password: 'password',
      email: 'member@gmail.com.vn',
    },
    {
      id: 3,
      name: 'Customer',
      username: 'customer',
      password: 'password',
      email: 'customer@gmail.com.vn',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
