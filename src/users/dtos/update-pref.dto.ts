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
 * DTO representing user preferences response
 */
export class UpdatePreferencesDto {
  /**
   * Favorite music genre
   * @example "Rock"
   */

  @IsEnum(MusicGenre)
  musicGenre: MusicGenre;

  /**
   * Personality type
   * @example "Ambivert"
   */
  @IsEnum(Personality)
  personality: Personality;

  /**
   * Religious affiliation
   * @example "Buddhist"
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
   * @example "Poetry"
   */
  @IsEnum(Creative)
  creative: Creative;
}
