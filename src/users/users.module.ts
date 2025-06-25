import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailerModule } from 'src/mailer/mailer.module';
import { UsersController } from './users.controller';
import { RecommendationModule } from 'src/recommendation/recommendation.module';
import { PenpalResolver } from './penpal.resolver';
import { PubSubModule } from 'src/pubsub/pubsub.module';

@Module({
  imports: [PrismaModule, MailerModule, RecommendationModule, PubSubModule],
  providers: [UsersService, PenpalResolver],
  exports: [UsersService, PenpalResolver],
  controllers: [UsersController],
})
export class UsersModule {}
