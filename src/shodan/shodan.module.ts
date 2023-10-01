import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ShodanController } from './controllers/shodan.controller';
import { ShodanService } from './services/shodan.service';
import { Shodan, ShodanSchema } from './entities/shodan.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Shodan.name, schema: ShodanSchema }]),
  ],
  controllers: [ShodanController],
  providers: [ShodanService],
})
export class ShodanModule {}
