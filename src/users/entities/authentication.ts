import { ApiProperty } from '@nestjs/swagger';

export class Authentication {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
