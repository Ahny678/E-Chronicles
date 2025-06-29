import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
//import { MailerController } from './mailer.controller';

@Module({
  controllers: [],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
