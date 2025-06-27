import { Field, ObjectType, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { UserEntity } from './users.entity';

@ObjectType()
export class PenpalRequest {
  @Field(() => ID)
  id: string;

  @Field()
  senderId: string;

  @Field()
  receiverId: string;

  @Field()
  status: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  // Add this only if you want to resolve sender and receiver as full objects
  @Field(() => UserEntity)
  sender: User;

  @Field(() => UserEntity)
  receiver: User;
}
