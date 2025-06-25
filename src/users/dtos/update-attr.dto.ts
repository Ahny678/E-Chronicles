import { IsEnum, IsUUID } from 'class-validator';
import {
  MusicGenre,
  Personality,
  Religion,
  Age,
  Gender,
  Creative,
} from '@prisma/client';

export class UpdateAttributesDto {
  @IsEnum(MusicGenre)
  musicGenre: MusicGenre;

  @IsEnum(Personality)
  personality: Personality;

  @IsEnum(Religion)
  religion: Religion;

  @IsEnum(Age)
  age: Age;

  @IsEnum(Gender)
  gender: Gender;

  @IsEnum(Creative)
  creative: Creative;
}
