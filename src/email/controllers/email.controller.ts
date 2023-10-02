import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { EmailService } from '../services/email.service';
import { SendEmailDto } from '../dtos/email.dto';

@ApiTags('Email Service')
@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post()
  @ApiOperation({ summary: 'Send a email' })
  create(@Body() email: SendEmailDto) {
    return this.emailService.send(email);
  }
}
