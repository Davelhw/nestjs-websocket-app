// src/modules/auth/dto/change-password.dto.ts

import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({ example: 'oldPassword123', description: 'Current password' })
  @IsString()
  oldPassword: string;

  @ApiProperty({ example: 'newStrongPassword456', description: 'New password' })
  @IsString()
  @MinLength(8)
  newPassword: string;
}
