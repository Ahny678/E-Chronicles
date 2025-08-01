import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { DiaryModule } from './diary/diary.module';
//import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
//import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MailerModule } from './mailer/mailer.module';
import { RecommendationModule } from './recommendation/recommendation.module';
import { GraphqlConfigModule } from './graphql/graphql.module';
import { PenpalModule } from './penpal/penpal.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    DiaryModule,
    // ThrottlerModule.forRoot([
    //   {
    //     ttl: 60000,
    //     limit: 30, //30 requests per minute
    //   },
    // ]),
    GraphqlConfigModule,
    AuthModule,
    UsersModule,
    MailerModule,
    RecommendationModule,
    PenpalModule,
  ],
  controllers: [],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard,
    // },
  ],
})
export class AppModule {}
