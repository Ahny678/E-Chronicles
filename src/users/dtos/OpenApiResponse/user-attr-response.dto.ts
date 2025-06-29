import { IsUUID, IsEnum } from 'class-validator';

import {
  MusicGenre,
  Personality,
  Religion,
  Age,
  Gender,
  Creative,
} from 'src/enums/atrributes/attributes';

/**
 * DTO representing user attributes response
 */
export class UserAttributesResponseDto {
  /**
   * Unique ID for the attributes object
   * @example "2131dd0c-3fb2-4d1b-bb00-ce6b8fb9c2cd"
   */
  @IsUUID()
  id: string;

  /**
   * ID of the user who owns the atrributes
   * @example "bfd48240-b8e1-4c07-b200-c5c2bbef5e5a"
   */
  @IsUUID()
  userId: string;

  /**
   * Favorite music genre
   * @example "Afrobeat"
   */
  @IsEnum(MusicGenre)
  musicGenre: MusicGenre;

  /**
   * Personality type
   * @example "Introvert"
   */
  @IsEnum(Personality)
  personality: Personality;

  /**
   * Religious affiliation
   * @example "Atheist"
   */
  @IsEnum(Religion)
  religion: Religion;

  /**
   * Age range
   * @example "Age18to25"
   */
  @IsEnum(Age)
  age: Age;

  /**
   * Gender identity
   * @example "Female"
   */
  @IsEnum(Gender)
  gender: Gender;

  /**
   * Creative ability
   * @example "Writing"
   */
  @IsEnum(Creative)
  creative: Creative;
}
