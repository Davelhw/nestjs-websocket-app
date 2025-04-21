import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';

interface JwtUser {
  userId: number;
  username: string;
}

interface AuthenticatedRequest extends Request {
  user: JwtUser;
}

@Controller()
export class AppController {
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: AuthenticatedRequest) {
    return {
      message: 'Hello protected route',
      user: req.user,
    };
  }
}
