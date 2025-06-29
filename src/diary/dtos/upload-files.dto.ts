//REMEMBER-->You can’t rely solely on Nest CLI Swagger plugin auto-generation when dealing with file upload
import { ApiPropertyOptional } from '@nestjs/swagger';

import { CreateEntryDto } from './create-diary.dto';

export class UploadEntryWithBodyDto extends CreateEntryDto {
  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: 'Image file',
  })
  image?: any;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: 'Video file',
  })
  video?: any;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: 'Audio file',
  })
  audio?: any;
}
