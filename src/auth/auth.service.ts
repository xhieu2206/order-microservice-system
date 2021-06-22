import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (user && user.password === password) {
      return user;
    }

    return null;
  }

  login(user: any) {
    const payload = {
      name: user.name,
      sub: user.id,
    };
    const returnUser = { ...user };
    delete returnUser.password;

    return {
      access_token: this.jwtService.sign(payload),
      user: returnUser,
    };
  }
}
