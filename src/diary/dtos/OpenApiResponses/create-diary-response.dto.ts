import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

/**
 * DTO representing the Diary object .
 */
export class CreateDiaryResponseDto {
  /** Entry ID
   * @example "2131dd0c-3fb2-4d1b-bb00-ce6b8fb9c2cd"
   */
  @IsUUID()
  id: string;

  /** Entry title
   * @example "Testing E-chronicles"
   */
  @IsString()
  title: string;
  /** Entry mood
   * @example "tentative"
   */
  @IsString()
  mood: string;
  /** Entry content
   * @example "So far so good"
   */
  @IsString()
  content: string;

  /** Image string uploaded to cloudinary
   * @example "fhsvsdufw793y.jpg"
   */
  @IsString()
  @IsOptional()
  image?: string | null;

  /** Video string uploaded to cloudinary
   * @example "fhsvsdufw793y.mp4"
   */
  @IsString()
  @IsOptional()
  video?: string | null;

  /** Audio string uploaded to cloudinary
   * @example "fhsvsdufw793y.mp3"
   */
  @IsString()
  @IsOptional()
  audio?: string | null;

  /** Protect from penpal?
   * @example "false"
   */
  @IsBoolean()
  isPrivate: boolean;
  @IsUUID()
  userId: string;

  /** Creation timestamp */
  createdAt: Date;

  /** Update timestamp */
  updatedAt: Date;
}
