import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailerModule } from 'src/mailer/mailer.module';
import { UsersController } from './users.controller';
import { RecommendationModule } from 'src/recommendation/recommendation.module';

import { PubSubModule } from 'src/pubsub/pubsub.module';

@Module({
  imports: [PrismaModule, MailerModule, RecommendationModule, PubSubModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
