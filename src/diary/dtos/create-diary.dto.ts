import { IsString, IsNotEmpty } from 'class-validator';
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
}
