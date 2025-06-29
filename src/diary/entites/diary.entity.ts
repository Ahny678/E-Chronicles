import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { UserEntity } from 'src/users/entities/users.entity';

@ObjectType()
export class DiaryEntry {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  mood: string;

  @Field()
  content: string;

  @Field(() => String, { nullable: true })
  image?: string | null;

  @Field(() => String, { nullable: true })
  video?: string | null;

  @Field(() => String, { nullable: true })
  audio?: string | null;

  @Field()
  isPrivate: boolean;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field()
  userId: string;

  // @Field(() => UserEntity)
  // user: UserEntity;
}
