import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateEntryDto {
  /**
   * Entry title
   * @example "Testing E-chronicles"
   */
  @IsString()
  @IsNotEmpty()
  title: string;
  /**
   * Entry mood
   * @example "tentative"
   */
  @IsString()
  @IsNotEmpty()
  mood: string;
  /**
   * Entry content
   * @example "So far so good"
   */
  @IsString()
  @IsNotEmpty()
  content: string;
  /**
   *  Protect from penpal?
   * @example "false"
   */
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isPrivate: boolean;
}
