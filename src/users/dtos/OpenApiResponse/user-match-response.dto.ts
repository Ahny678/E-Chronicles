import { IsEmail, IsString, IsUUID } from 'class-validator';
import { UserAttributesResponseDto } from './user-attr-response.dto';
import { UserPreferencesResponseDto } from './user-pref-response.dto';

/**
 * DTO representing the user object including nested attributes and preferences.
 */
export class UserResponseWithAPDto {
  /** User ID
   * @example "2131dd0c-3fb2-4d1b-bb00-ce6b8fb9c2cd"
   */
  @IsUUID()
  id: string;

  /** User name
   * @example "LiamPerfect"
   */
  @IsUUID()
  name: string;

  /** User hashed password
   * @example "password"
   */
  @IsString()
  password: string;

  /** User email
   * @example "liam.perfect@example.com"
   */

  @IsEmail()
  email: string;

  /** Creation timestamp */
  createdAt: Date;

  /** Update timestamp */
  updatedAt: Date;

  /** Attributes associated with the user
   * @example {id: '2aebd4f1-9f96-4fd0-879d-0ab56cb12d77',userId: 'c3910e99-ecf9-4dc2-bfc9-9af3a6eba624', musicGenre: 'Rock',personality: 'Ambivert',religion: 'Atheist',age: 'Age18to25',gender: 'Male',creative: 'Poetry',}
   */
  Attributes: UserAttributesResponseDto;

  /** Preferences associated with the user
   * @example {id: 'a1f145e8-ea81-4460-bfbd-b81a6b0698b3',userId: 'c3910e99-ecf9-4dc2-bfc9-9af3a6eba624',musicGenre: 'Rock',personality: 'Ambivert',religion: 'Atheist',age: 'Age18to25',gender: 'Female',creative: 'Poetry',}
   */
  Preferences: UserPreferencesResponseDto;
}

/**
 * DTO representing a user match with a similarity score
 */
export class UserMatchResponseDto {
  /** The matched user with all their details */
  user: UserResponseWithAPDto;

  /** The calculated compatibility score
   * * @example 8.9
   */
  score: number;
}
