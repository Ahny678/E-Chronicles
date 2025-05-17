import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { DiaryModule } from './diary/diary.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, DiaryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
