import { Inject, UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PrismaService } from 'src/prisma/prisma.service';
import { PUB_SUB } from 'src/pubsub/constants/pubsubs.constants';
import { PENPAL_REQUEST_RECEIVED } from 'src/pubsub/pubsub.events';
import { PenpalRequest } from './entities/penpal-request.entity';

import { GqlAuthGuard } from 'src/guards/auth/gql-auth.guard';
import { reviveDates } from 'src/helpers/reviveDates';

@Resolver()
@UseGuards(GqlAuthGuard)
export class PenpalResolver {
  constructor(
    @Inject(PUB_SUB) private pubSub: RedisPubSub,
    private readonly prismaService: PrismaService,
  ) {}

  @Query(() => [PenpalRequest])
  async getAllPenpalRequests() {
    return this.prismaService.penpalRequest.findMany();
  }

  @Mutation(() => Boolean)
  async sendPenpalRequest(
    @Args('receiverId') receiverId: string,
    @Context() context,
  ) {
    const senderId = context.req.user.id;
    const request = await this.prismaService.penpalRequest.create({
      data: { senderId, receiverId },
      include: {
        sender: true,
        receiver: true,
      },
    });

    await this.pubSub.publish(PENPAL_REQUEST_RECEIVED, {
      penpalRequestReceived: request,
    });

    return true;
  }

  //when someone subscribes to this, they get a PenPalRequest
  @Subscription(() => PenpalRequest, {
    filter: (payload, variables, context) => {
      // console.log('Subscription Context:', context);
      // console.log('Payload:', payload);
      // console.log('Variables:', variables);

      const userId = context.req?.user?.id;
      if (!userId) {
        console.error('No user ID found in context');
        return false;
      }

      return payload.penpalRequestReceived.receiverId === userId;
    },
    resolve: (payload) => {
      return reviveDates(payload.penpalRequestReceived);
    },
  })
  penpalRequestReceived() {
    console.log('New subscription created');
    return this.pubSub.asyncIterator(PENPAL_REQUEST_RECEIVED);
  }
}
