import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from '../services/logger.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    const { method, originalUrl } = req;

    this.logger.log(`Request: ${method} ${originalUrl}`);

    res.on('finish', () => {
      const duration = Date.now() - start;
      this.logger.log(`[${req.method}] ${req.url} - ${duration}ms`);
      this.logger.log(`Response: ${res.statusCode}`);
    });

    next();
  }
}
