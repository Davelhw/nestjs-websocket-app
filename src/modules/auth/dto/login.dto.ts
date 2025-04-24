import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'admin', description: 'Username of the admin user' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'your_password', description: 'User password' })
  @IsString()
  password: string;
}
