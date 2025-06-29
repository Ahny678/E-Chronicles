import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { DiaryService } from './diary.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateEntryDto } from './dtos/create-diary.dto';
import { UpdateEntryDto } from './dtos/update-diary.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { OwnerGuard } from 'src/guards/owner/owner.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateDiaryResponseDto } from './dtos/OpenApiResponses/create-diary-response.dto';
import { UploadEntryWithBodyDto } from './dtos/upload-files.dto';
import { DiaryEntry } from './entites/diary.entity';
import { GetDiaryResponseDto } from './dtos/OpenApiResponses/get-diaries-response.dto';

/**
 * Controller for diary-related actions
 */
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('diary')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  /**
   * Create Diary entry
   *
   * @remarks Uploads image, video, and/or audio with a diary entry.
   * @returns The diary object
   */
  @Post()
  //for accepting multipart form data
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'video', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload entry with optional media files',
    type: UploadEntryWithBodyDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request — invalid diary data' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized — user not authenticated',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async create(
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
      video?: Express.Multer.File[];
      audio?: Express.Multer.File[];
    } = {},
    @Body() body: CreateEntryDto,
    @Req() { user },
  ): Promise<CreateDiaryResponseDto> {
    const userId = user.id;
    return await this.diaryService.create(files, body, userId);
  }

  /**
   * Get all entires
   *
   * @returns TAn array of diary entries
   * @throws {401} Unauthorized — user not authenticated
   * @throws {500} Internal Server Error
   */
  @ApiQuery({ name: 'mood', required: false, example: 'tentative' })
  @Get()
  findAll(
    @Req() { user },
    @Query('mood') mood?: string,
  ): Promise<GetDiaryResponseDto[]> {
    const userId = user.id;
    return this.diaryService.findAll(userId, mood);
  }

  /**
   * Get an entry by id
   *
   * @returns A diary entry
   * @throws {401} Unauthorized — user not authenticated
   * @throws {500} Internal Server Error
   */
  @UseGuards(OwnerGuard)
  @ApiParam({ name: 'id', required: true, example: 'insert diary id...' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<GetDiaryResponseDto> {
    return this.diaryService.findOne(id);
  }

  /**
   * Update an entry by id
   *
   * @returns Updated diary entry
   * @throws {401} Unauthorized — user not authenticated
   * @throws {500} Internal Server Error
   */
  @UseGuards(AuthGuard, OwnerGuard)
  @ApiParam({ name: 'id', required: true, example: ' insert diary id...' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() newBody: UpdateEntryDto,
  ): Promise<GetDiaryResponseDto> {
    return this.diaryService.fixOne(id, newBody);
  }

  /**
   * Delete an entry by id
   *
   * @throws {401} Unauthorized — user not authenticated
   * @throws {500} Internal Server Error
   */
  @UseGuards(OwnerGuard)
  @ApiParam({ name: 'id', required: true, example: ' insert diary id...' })
  @Delete(':id')
  delete(@Param('id') id: string) {
    this.diaryService.delete(id);
    return { message: 'Diary entry deleted successfully' };
  }
}
