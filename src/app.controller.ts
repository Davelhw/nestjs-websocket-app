import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtGuard } from './common/guards/jwt.guard';

interface JwtUser {
  userId: number;
  username: string;
}

interface AuthenticatedRequest extends Request {
  user: JwtUser;
}

@Controller()
export class AppController {
  @UseGuards(JwtGuard)
  @Get('profile')
  getProfile(@Request() req: AuthenticatedRequest) {
    return {
      message: 'Hello protected route',
      user: req.user,
    };
  }
}
