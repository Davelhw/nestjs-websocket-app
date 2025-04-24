import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Verify2FADto {
  @ApiProperty({
    example: '123456',
    description: 'OTP code from Google Authenticator or similar',
  })
  @IsString()
  token: string;

  @ApiProperty({
    example: 'admin',
    description: 'Username of the user verifying 2FA',
  })
  @IsString()
  username: string;
}
