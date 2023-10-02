import { Injectable, Inject, ConflictException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

import { SendEmailDto } from '../dtos/email.dto';

@Injectable()
export class EmailService {
  private transporter: any;

  constructor(@Inject('configService') private configService) {
    const { host, port, user, pass, secure } = configService;
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });
  }

  async send(email: SendEmailDto) {
    try {
      const mailStructure = {
        from: this.configService.user,
        to: email.to,
        subject: email.subject,
        text: undefined,
        html: undefined,
      };

      if (email.isHTML) {
        mailStructure.html = email.body;
      } else {
        mailStructure.text = email.body;
      }

      const info = await this.transporter.sendMail(mailStructure);

      return {
        id: info.messageId,
        messaje: 'Email sent successfully',
        to: email.to,
      };
    } catch (exception) {
      throw new ConflictException(`A conflict has occurredo: ${exception}`);
    }
  }
}
