import { Module, Global } from '@nestjs/common';
import {
  PeopleDataSource,
  TapGameDataSource,
} from '../../config/typeorm.config';

@Global()
@Module({
  providers: [
    {
      provide: 'PEOPLE_DB',
      useFactory: async () => {
        if (!PeopleDataSource.isInitialized)
          await PeopleDataSource.initialize();
        return PeopleDataSource;
      },
    },
    {
      provide: 'TAPGAME_DB',
      useFactory: async () => {
        if (!TapGameDataSource.isInitialized)
          await TapGameDataSource.initialize();
        return TapGameDataSource;
      },
    },
  ],
  exports: ['PEOPLE_DB', 'TAPGAME_DB'],
})
export class PeoplDbModule {}
