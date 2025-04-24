import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

@Injectable()
export class JwtConfigService {
  constructor(private readonly configService: ConfigService) {}

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.configService.get<string>(
        String(process.env.JWT_SECRET),
        'cb60e06ec6480d6ce85cb40480d58d3e506e08be03c1645d603867e655397cbd',
      ),
      signOptions: {
        expiresIn: this.configService.get<string | number>(
          String(process.env.JWT_EXPIRES_IN),
          String(process.env.JWT_EXPIRES_TIMEUNIT),
        ),
      },
    };
  }
}
export const JwtConfig = () => ({
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN || '4h',
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '6h',
});
