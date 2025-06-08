import { Body, Controller, Post } from '@nestjs/common';
import { AuthPayloadDto } from './dtos/auth.dto';
import { SignupDto } from './dtos/signup.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post()
  async signup(@Body() data: SignupDto) {
    return await this.authService.signup(data);
  }
  @Post('login')
  login(@Body() authPayload: AuthPayloadDto) {}
}
