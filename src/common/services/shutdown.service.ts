import {
  Injectable,
  OnModuleDestroy,
  OnApplicationShutdown,
  Logger,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import {
  AdminDataSource,
  PeopleDataSource,
  TapGameDataSource,
} from '../../config/typeorm.config';

@Injectable()
export class ShutdownService implements OnModuleDestroy, OnApplicationShutdown {
  private readonly logger = new Logger(ShutdownService.name);

  async onModuleDestroy() {
    this.logger.log('onModuleDestroy: Closing database connections...');
    await this.closeConnections();
  }

  async onApplicationShutdown(signal?: string) {
    this.logger.log(
      `onApplicationShutdown(${signal}): Closing database connections...`,
    );
    await this.closeConnections();
  }

  private async closeConnections() {
    await this.closeConnection(AdminDataSource, 'Adm DB');
    await this.closeConnection(PeopleDataSource, 'People DB');
    await this.closeConnection(TapGameDataSource, 'Tap DB');
    // await this.closeConnection(AppDataSourceMq, 'MQ DB');
  }

  private async closeConnection(dataSource: DataSource, name: string) {
    if (dataSource.isInitialized) {
      this.logger.log(`Closing ${name} connection...`);
      await dataSource.destroy();
      this.logger.log(`${name} connection closed.`);
    } else {
      this.logger.warn(
        `${name} connection is not initialized. Skipping shutdown.`,
      );
    }
  }
}
