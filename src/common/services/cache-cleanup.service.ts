import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class CacheCleanupService implements OnModuleInit {
  private readonly logger = new Logger(CacheCleanupService.name);

  onModuleInit() {
    this.logger.log('Running cache cleanup...');
    setTimeout(() => this.clearCache(), 5000); // Run async without blocking
  }

  clearCache() {
    try {
      // Your cache clearing logic here
      this.logger.log('Cache cleanup complete');
    } catch (error) {
      this.logger.error('Error in cache cleanup:', error);
    }
  }
}
