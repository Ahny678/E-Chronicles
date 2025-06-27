import { Module } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';
import { PUB_SUB } from './constants/pubsubs.constants';

const pubSubProvider = {
  provide: 'PUB_SUB',
  useFactory: () => {
    const options = {
      host: 'localhost',
      port: 6379,
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
