/**
 * DTO representing the Diary objects erturned .
 */
export class GetDiaryResponseDto {
  /** Entry ID
   * @example "2131dd0c-3fb2-4d1b-bb00-ce6b8fb9c2cd"
   */
  id: string;

  /** Entry Title
   * @example "Testing"
   */
  title: string;

  /** Entry mood
   * @example "Tentative"
   */
  mood: string;

  /** Entry content
   * @example "so far so good"
   */
  content: string;

  /** Entry image
   * @example "rwy6897tyu.jpg"
   */
  image?: string | null;

  /** Entry video
   * @example "rwy6897tyu.mp4"
   */
  video?: string | null;

  /** Entry audio
   * @example "rwy6897tyu.mp3"
   */
  audio?: string | null;

  /** Protected from penpal?
   * @example "false"
   */
  isPrivate: boolean;

  createdAt: Date;

  updatedAt: Date;

  /** Id of the owner
   * @example "2131dd0c-3fb2-4d1b-bb00-ce6b8fb9c2cd"
   */
  userId: string;
}
