import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class PenpalRequestAcceptedPayload {
  @Field()
  senderId: string;

  @Field()
  receiverId: string;
}
