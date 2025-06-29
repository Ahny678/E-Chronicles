// import { Controller, Post } from '@nestjs/common';
// import { MailerService } from './mailer.service';
// import { SendEmailDto } from './dtos/send-email.dto';

// @Controller('mailer')
// export class MailerController {
//   constructor(private readonly mailerService: MailerService) {}
//   @Post('send-mail')
//   async sendMail() {
//     const data: SendEmailDto = {
//       from: { name: 'Tiffany', address: 'tiffany@gmail.com' },
//       receipients: [{ name: 'AhnyTheX', address: 'nebotiffany@gmail.com' }],
//       subject: 'Imma use you asa test',
//       html: '<p>That was easy!<p>',
//     };

//     return await this.mailerService.sendEmail(data);
//   }
// }
