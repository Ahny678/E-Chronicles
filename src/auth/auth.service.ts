import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dtos/auth.dto';
import { UsersService } from 'src/users/users.service';
import { SignupDto } from './dtos/signup.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}
  async signup(data: SignupDto) {
    const existingUser = await this.userService.findByEmail(data.email);
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }
    const user = await this.userService.createuser(data);
    console.log(`user created:`, user);
    return user;
  }
  async validateUser({ name, email, password }: AuthPayloadDto) {
    const existingUser = await this.userService.findByEmail(email);
    if (!existingUser) {
      return null;
    }
  }
}
