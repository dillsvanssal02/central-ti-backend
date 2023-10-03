import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import config from '../config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, user, pass, host, port, dbName } =
          configService.mongo;

        const uri =
          connection === 'mongodb+srv'
            ? `${connection}://${host}/`
            : `${connection}://${host}:${port}/`;

        return {
          uri,
          user,
          pass,
          dbName,
        };
      },
      inject: [config.KEY],
    }),
  ],
})
export class DatabaseModule {}
