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
        '83d86db7f86cd0ad9cab4d94f73c4a5f211503ca150accb63d9a2a24646b76ce78d5fcb193a1e9e59260cbd2f286ac2f85bc1cc62f7c4543ffa60cbc80f22522',
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
