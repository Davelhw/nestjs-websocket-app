import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: { username: string }): { accessToken: string } {
    // Simulate user ID lookup
    const userId = body.username === 'admin' ? 1 : 2;
    const token = this.authService.generateToken(userId, body.username);
    return { accessToken: token };
  }
}
