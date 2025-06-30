// # For send, accept, decline, get requests
import { Inject, UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PenpalRequestAcceptedPayload } from './interfaces/penpal.interafce';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PrismaService } from 'src/prisma/prisma.service';
import { PUB_SUB } from 'src/pubsub/constants/pubsubs.constants';
import {
  PENPAL_REQUEST_ACCEPTED,
  PENPAL_REQUEST_RECEIVED,
} from 'src/pubsub/pubsub.events';
import { PenpalRequest } from '../users/entities/penpal-request.entity';

import { GqlAuthGuard } from 'src/guards/auth/gql-auth.guard';
import { reviveDates } from 'src/helpers/reviveDates';
import { PenpalService } from './penpal.service';

@Resolver()
@UseGuards(GqlAuthGuard)
export class PenpalResolver {
  constructor(
    @Inject(PUB_SUB) private pubSub: RedisPubSub,
    private readonly prismaService: PrismaService,
    private penService: PenpalService,
  ) {}

  @Query(() => [PenpalRequest], {
    description: `Get pending Penpal Requests
    **Query Structure**
    query{
  getAllPenpalRequests {
    id
    senderId
    receiverId
    status
    createdAt
    sender {
      id
      name
    }
  }
}    
    `,
  })
  async getAllPenpalRequests(@Context() context) {
    const userId = context.req.user.id;
    return this.penService.getMyPenPalRequests(userId);
  }

  @Mutation(() => Boolean, {
    description: `Send a pen pal request to another user.

**Mutation Structure:**
mutation SendPenpalRequest($receiverId: String!) {
  sendPenpalRequest(receiverId: $receiverId)
}`,
  })
  async sendPenpalRequest(
    @Args('receiverId')
    receiverId: string,
    @Context() context,
  ) {
    const senderId = context.req.user.id;
    const request = await this.penService.createPenRequest(
      senderId,
      receiverId,
    );
    await this.pubSub.publish(PENPAL_REQUEST_RECEIVED, {
      penpalRequestReceived: request,
    });
    return true;
  }

  @Subscription(() => PenpalRequest, {
    description: `Listen for penpal requests
    **Subscription Format**
    subscription PenpalRequestReceived {
  penpalRequestReceived {
    id
    senderId
    receiverId
    sender {
      id
      name
    }
    receiver {
      id
      name
    }
    createdAt
  }
}
    `,
    filter: (payload, _, context) => {
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

  @Mutation(() => Boolean)
  async handlePenpalRequest(
    @Args('requestId') requestId: string,
    @Args('action') action: 'ACCEPT' | 'DECLINE',
    @Context() context,
  ) {
    const userId = context.req.user.id;
    const request = await this.prismaService.penpalRequest.findUnique({
      where: { id: requestId },
    });

    if (!request || request.receiverId !== userId) {
      throw new Error('Unauthorized or invalid request');
    }
    //if it the decline, delete from database
    if (action == 'DECLINE') {
      this.penService.deletePenPalRequest(requestId, userId);
      return true;
    } else if (action === 'ACCEPT') {
      const info = await this.penService.acceptPenPalRequest(
        requestId,
        request,
      );

      // then publish so the sender can know wassup
      await this.pubSub.publish(PENPAL_REQUEST_ACCEPTED, {
        penpalRequestAccepted: info,
      });
      return true;
    }
  }
  @Subscription(() => PenpalRequestAcceptedPayload, {
    filter: (payload, _, context) => {
      // Only send to the sender of the request
      return payload.penpalRequestAccepted.senderId === context.req.user.id;
    },
  })
  penpalRequestAccepted() {
    return this.pubSub.asyncIterator(PENPAL_REQUEST_ACCEPTED);
  }
}
