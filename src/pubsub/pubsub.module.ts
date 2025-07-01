import { Module } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';
import { PUB_SUB } from './constants/pubsubs.constants';
import * as dotenv from 'dotenv';
dotenv.config();
const pubSubProvider = {
  provide: 'PUB_SUB',
  useFactory: () => {
    const options = {
      host: process.env.REDIS_HOST_NAME,
      port: process.env.REDIS_PORT
        ? parseInt(process.env.REDIS_PORT, 10)
        : 6379,
      retryStrategy: (times) => Math.min(times * 50, 2000),
    };

    return new RedisPubSub({
      publisher: new Redis(options),
      subscriber: new Redis(options),
    });
  },
};

@Module({
  providers: [pubSubProvider],
  exports: [PUB_SUB],
})
export class PubSubModule {}
