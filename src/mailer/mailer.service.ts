import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer'; // module used to send emails via SMTP.
import { ConfigService } from '@nestjs/config'; //provides access to environment variables
import { SendEmailDto } from './dtos/send-email.dto';
import Mail from 'nodemailer/lib/mailer';
//import SMTPTransport from 'nodemailer/lib/smtp-transport';
@Injectable()
export class MailerService {
  constructor(private configService: ConfigService) {}
  mailTransport() {
    //create and return a nodemailer transporter using SMTP

    // const transporter = nodemailer.createTransport({
    //   host: this.configService.get<string>('MAIL_HOST'),
    //   port: this.configService.get<string>('MAIL_PORT'),
    //   secure: false, // true for 465, false for other ports
    //   auth: {
    //     user: this.configService.get<string>('MAIL_USER'),
    //     pass: this.configService.get<string>('MAIL_PASSWORD'),
    //   },
    // } as SMTPTransport.Options);

    const transporter = nodemailer.createTransport({
      host: this.configService.get<string>('PROD_MAIL_HOST'),
      port: Number(this.configService.get<string>('PROD_MAIL_PORT')),
      secure: false, // false for 587, true for 465
      auth: {
        user: this.configService.get<string>('PROD_MAIL_USER'),
        pass: this.configService.get<string>('PROD_MAIL_PASSWORD'),
      },
    });

    return transporter;
  }

  async sendEmail(data: SendEmailDto) {
    //send an email using the transporter
    const { from, receipients, subject, html } = data;
    const transport = this.mailTransport();
    const options: Mail.Options = {
      //Mail.options sets the type for options var.
      from: from ?? {
        //If from is not provided in the DTO, it falls back to default values (APP_NAME and DEF_MAIL_FROM from env).
        name: this.configService.get<string>('APP_NAME')!,
        address: this.configService.get<string>('DEF_MAIL_FROM')!,
      },
      to: receipients,
      subject,
      html,
    };

    try {
      const info = await transport.sendMail(options);
      console.log('Email sent: ', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (err) {
      console.error('Internal Server Error', err);
    }
  }
}
