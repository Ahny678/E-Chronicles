// update-entry.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateEntryDto } from './create-diary.dto';

export class UpdateEntryDto extends PartialType(CreateEntryDto) {
  /**
   *  Title of entry
   * @example "Updated Title"
   */

  title?: string;
}
