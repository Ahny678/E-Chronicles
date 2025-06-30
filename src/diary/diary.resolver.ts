import { Inject, UseGuards } from '@nestjs/common';
import { Resolver, Subscription } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/guards/auth/gql-auth.guard';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PUB_SUB } from 'src/pubsub/constants/pubsubs.constants';
import { NEW_DIARY_POST } from 'src/pubsub/pubsub.events';
import { DiaryEntryEvent } from './entites/returnedDiary.entity';
import { reviveDates } from 'src/helpers/reviveDates';

@Resolver()
@UseGuards(GqlAuthGuard)
export class DiaryResolver {
  constructor(@Inject(PUB_SUB) private pubSub: RedisPubSub) {}
  @Subscription(() => DiaryEntryEvent, {
    description: `Subscribe to new diary entries posted by your pen pal 
    **SUB Format**
    subscription newDiaryPosted {
  newDiaryEntryPosted {
    penPalId
    entry {
      id
      title
      mood
      content
      image
      video
      audio
      isPrivate
      createdAt
      updatedAt
      userId
    }
  }
}
    `,
    filter: (payload, _, context) => {
      // Only send to the sender of the request
      return payload.newDiaryEntryPosted.penPalId === context.req.user.id;
    },
    resolve: (payload) => {
      return reviveDates(payload.newDiaryEntryPosted);
    },
  })
  newDiaryEntryPosted() {
    return this.pubSub.asyncIterator(NEW_DIARY_POST);
  }
}
