// update-entry.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateEntryDto } from './create-diary.dto';

export class UpdateEntryDto extends PartialType(CreateEntryDto) {}
