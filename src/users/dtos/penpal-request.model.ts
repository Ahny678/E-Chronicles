// penpal-request.model.ts
import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { RequestStatus } from '@prisma/client';

registerEnumType(RequestStatus, {
  name: 'RequestStatus',
});

@ObjectType()
export class PenpalRequest {
  @Field()
  id: string;

  @Field()
  senderId: string;

  @Field()
  receiverId: string;

  @Field(() => RequestStatus)
  status: RequestStatus;

  @Field()
  createdAt: Date;
}
