import { IsEnum, IsUUID } from 'class-validator';
import {
  Age,
  Creative,
  Gender,
  MusicGenre,
  Personality,
  Religion,
} from 'src/enums/atrributes/attributes';

/**
 * DTO for user attributes response
 */
export class UpdateAttributesDto {
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
   * Religious preference
   * @example "Atheist"
   */
  @IsEnum(Religion)
  religion: Religion;

  /**
   * User's age range
   * @example "Age18to25"
   */
  @IsEnum(Age)
  age: Age;

  /**
   * User's gender
   * @example "Female"
   */
  @IsEnum(Gender)
  gender: Gender;
  /**
   * User's creative ability
   * @example "Writing"
   */
  @IsEnum(Creative)
  creative: Creative;
}
