import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      name: 'Admin',
      username: 'admin',
      password: 'password',
    },
    {
      id: 2,
      name: 'Member',
      username: 'member',
      password: 'password',
    },
    {
      id: 3,
      name: 'Customer',
      username: 'customer',
      password: 'password',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
