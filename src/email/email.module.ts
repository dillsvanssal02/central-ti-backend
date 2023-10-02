import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { EmailController } from './controllers/email.controller';
import { EmailService } from './services/email.service';

import config from '../config';

@Module({
  controllers: [EmailController],
  providers: [
    EmailService,
    {
      provide: 'configService',
      useFactory: async (configService: ConfigType<typeof config>) => {
        return configService.mail;
      },
      inject: [config.KEY],
    },
  ],
})
export class EmailModule {}
