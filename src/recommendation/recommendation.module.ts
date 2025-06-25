import { Module } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';

@Module({
  controllers: [],
  providers: [RecommendationService],
  exports: [RecommendationService],
})
export class RecommendationModule {}
