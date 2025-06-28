import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

/**
 * DTO for user signup
 */
export class SignupDto {
  /**
   * User's name
   * @example 'Tiffany'
   */
  @IsNotEmpty()
  name: string;

  /**
   * User's email address
   * @example 'ahny@coders.com'
   */
  @IsEmail()
  email: string;

  /**
   * User's password
   * @example 'yuriGenreAlways'
   */
  @IsNotEmpty()
  @MinLength(3)
  password: string;
}
