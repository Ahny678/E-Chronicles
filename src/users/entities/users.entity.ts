import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class UserEntity {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;
}
