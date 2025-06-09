import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export class AuthPayloadDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @MinLength(3)
  password: string;
}
