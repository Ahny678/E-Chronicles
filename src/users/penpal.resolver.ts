import { Inject } from '@nestjs/common';
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
import { PenpalRequest } from './dtos/penpal-request.model';

@Resolver()
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
    });

    await this.pubSub.publish(PENPAL_REQUEST_RECEIVED, {
      penpalRequestReceived: request,
    });

    return true;
  }

  //when someone subscribes to this, they get a PenPalRequest
  @Subscription(() => PenpalRequest, {
    filter: (payload, _, context) =>
      payload.penpalRequestReceived.receiverId === context.req.user.id,
  })
  penpalRequestReceived() {
    return this.pubSub.asyncIterator(PENPAL_REQUEST_RECEIVED);
  }
}
