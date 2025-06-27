import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RecommendationModule } from 'src/recommendation/recommendation.module';
import { PubSubModule } from 'src/pubsub/pubsub.module';

import { PenpalResolver } from './penpal.resolver'; // Consider consistent file paths
import { PenpalService } from './penpal.service';

@Module({
  imports: [PrismaModule, RecommendationModule, PubSubModule],
  providers: [PenpalService, PenpalResolver],
})
export class PenpalModule {}
