import { Injectable, ConflictException } from '@nestjs/common';

import { SendEmailDto } from '../dtos/email.dto';

@Injectable()
export class EmailService {
  constructor() {}

  async send(email: SendEmailDto) {
    try {
      console.log(email);
    } catch (exception) {
      throw new ConflictException(`A conflict has occurredo: ${exception}`);
    }
  }
}
