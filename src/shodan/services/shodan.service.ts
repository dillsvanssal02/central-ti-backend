import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { CreateShodanDto } from '../dtos/shodan.dto';
import { Shodan } from '../entities/shodan.entity';

const filter: FilterQuery<Shodan> = {};
filter.deletedAt = { $eq: null };

@Injectable()
export class ShodanService {
  constructor(@InjectModel(Shodan.name) private database: Model<Shodan>) {}

  async get() {
    const data = await this.database.find(filter).exec();
    if (data.length === 0) {
      throw new NotFoundException(`There are no shodan events in the database`);
    }
    return data;
  }

  async getOne(id: string) {
    const data = await this.database.findById(id).exec();
    if (!data || data.deletedAt !== null) {
      throw new NotFoundException(`Shodan event with id ${id} does not exist`);
    }
    return data;
  }

  async create(event: CreateShodanDto) {
    try {
      const data = await new this.database(event).save();
      return {
        message: 'Shodan event was created',
        dato: data,
        created: true,
      };
    } catch (exception) {
      throw new ConflictException(`A conflict has occurredo: ${exception}`);
    }
  }
}
