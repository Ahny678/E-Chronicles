import { Module } from '@nestjs/common';
import { DiaryController } from './diary.controller';
import { DiaryService } from './diary.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DiaryResolver } from './diary.resolver';
import { PubSubModule } from 'src/pubsub/pubsub.module';
console.log('d');
@Module({
  imports: [CloudinaryModule, PrismaModule, PubSubModule],
  controllers: [DiaryController],
  providers: [DiaryService, DiaryResolver],
})
export class DiaryModule {}
