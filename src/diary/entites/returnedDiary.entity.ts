import { ObjectType, Field, ID } from '@nestjs/graphql';
import { DiaryEntry } from './diary.entity';

@ObjectType({ description: 'Event returned when a new diary entry is posted' })
export class DiaryEntryEvent {
  @Field(() => DiaryEntry, { description: 'The new diary entry data' })
  entry: DiaryEntry;

  @Field(() => String, { description: 'The penPal ID of the recipient user' })
  penPalId: string;
}
