import { Injectable, Inject, ConflictException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import puppeteer from 'puppeteer';

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
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        await page.goto(email.body, { waitUntil: 'domcontentloaded' });

        await new Promise((resolve) => setTimeout(resolve, 15000));

        const currentHtml = await page.content();
        await page.setViewport({ width: 1080, height: 1024 });

        const modifiedHtml = currentHtml.replace(
          /<img[^>]+src=['"]([^'"]+)['"][^>]*>/g,
          (match, src) => {
            const currentSrc = new URL(src, page.url()).href;
            return match.replace(src, currentSrc);
          },
        );

        await browser.close();
        mailStructure.html = modifiedHtml;
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
