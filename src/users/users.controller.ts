import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdatePreferencesDto } from '../penpal/dtos/update-pref.dtos';
import { UpdateAttributesDto } from '../penpal/dtos/update-attr.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Patch('attributes')
  updateUserPreferences(@Req() req, @Body() dto: UpdatePreferencesDto) {
    const userId = req.user.id;
    return this.userService.updateUserPreferences(userId, dto);
  }

  @Patch('preferences')
  updatePreferredPreferences(@Req() req, @Body() dto: UpdateAttributesDto) {
    const userId = req.user.id;
    return this.userService.updatePreferredPreferences(userId, dto);
  }

  @Get('my-matches')
  getMatches(@Req() req) {
    const userId = req.user.id;
    return this.userService.getTopFiveMatches(userId);
  }
}
