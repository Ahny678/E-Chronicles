import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateEntryDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  mood: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsBoolean()
  isPrivate: boolean;
}
