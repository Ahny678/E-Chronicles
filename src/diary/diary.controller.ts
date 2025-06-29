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
  ApiResponse,
} from '@nestjs/swagger';
import { CreateDiaryResponseDto } from './dtos/OpenApiResponses/create-diary-response.dto';
import { UploadEntryWithBodyDto } from './dtos/upload-files.dto';

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
  @ApiResponse({
    status: 201,
    description: 'Diary entry created successfully.',
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

  @Get()
  findAll(@Req() { user }, @Query('mood') mood?: string) {
    const userId = user.id;
    return this.diaryService.findAll(userId, mood);
  }

  @UseGuards(OwnerGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diaryService.findOne(id);
  }
  @UseGuards(OwnerGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() newBody: UpdateEntryDto) {
    return this.diaryService.fixOne(id, newBody);
  }
  @UseGuards(OwnerGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.diaryService.delete(id);
  }
}
