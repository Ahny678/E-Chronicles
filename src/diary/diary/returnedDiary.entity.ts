// src/diary/dto/diary-entry-event.dto.ts

import { ObjectType, Field, ID } from '@nestjs/graphql';
import { DiaryEntry } from './diary.entity';

@ObjectType()
export class DiaryEntryEvent {
  @Field(() => DiaryEntry)
  entry: DiaryEntry;

  @Field(() => String)
  penPalId: string;
}
