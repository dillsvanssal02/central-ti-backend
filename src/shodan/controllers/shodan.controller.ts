import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ShodanService } from '../services/shodan.service';
import { CreateShodanDto } from '../dtos/shodan.dto';
import { MongoIdPipe } from '../../common/mongo-id.pipe';

@ApiTags('Shodan Information')
@Controller('shodan')
export class ShodanController {
  constructor(private shodanService: ShodanService) {}

  @Get()
  @ApiOperation({ summary: 'Get all shodan events' })
  getByPatient() {
    return this.shodanService.get();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a shodan event' })
  getOne(@Param('id', MongoIdPipe) id: string) {
    return this.shodanService.getOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a shodan event' })
  create(@Body() event: CreateShodanDto) {
    return this.shodanService.create(event);
  }
}
