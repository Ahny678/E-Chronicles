import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdatePreferencesDto } from './dtos/update-pref.dto';
import { UpdateAttributesDto } from './dtos/update-attr.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { UserAttributesResponseDto } from './dtos/OpenApiResponse/user-attr-response.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserPreferencesResponseDto } from './dtos/OpenApiResponse/user-pref-response.dto';
import { UserMatchResponseDto } from './dtos/OpenApiResponse/user-match-response.dto';

/**
 * Controller for user-related actions
 */
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  /**
   * Update user's attributes
   *
   * @returns The updated attributes object
   * @throws {401} Unauthorized — user not authenticated
   * @throws {400} Bad Request — invalid atrributes data
   */
  @Patch('attributes')
  updateUserPreferences(
    @Req() req,
    @Body() dto: UpdateAttributesDto,
  ): Promise<UserAttributesResponseDto> {
    const userId = req.user.id;
    return this.userService.updateAttributes(userId, dto);
  }

  /**
   * Update user's preferences
   *
   * @returns The updated preferences object
   * @throws {401} Unauthorized — user not authenticated
   * @throws {400} Bad Request — invalid preference data
   */

  @Patch('preferences')
  updatePreferredPreferences(
    @Req() req,
    @Body() dto: UpdatePreferencesDto,
  ): Promise<UserPreferencesResponseDto> {
    const userId = req.user.id;
    return this.userService.updatePreferences(userId, dto);
  }

  /**
   * Get user's top matches
   *
   * @returns The updated attributes object
   * @throws {401} Unauthorized — user not authenticated
   
   */
  @Get('my-matches')
  getMatches(@Req() req): Promise<UserMatchResponseDto[]> {
    const userId = req.user.id;
    return this.userService.getTopFiveMatches(userId);
  }

  /**
   * Delete's a user's penpal connection
   *
   * @throws {401} Unauthorized — user not authenticated
   * @throws {500} Internal Server Error
   */
  @Delete('disconnect')
  severeConnection(@Req() req) {
    const userId = req.user.id;
    this.userService.severeConnection(userId);
    return { message: 'Succesfully severed connection' };
  }
}
