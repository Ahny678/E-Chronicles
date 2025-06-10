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

@Controller('diary')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @UseGuards(AuthGuard)
  @Post()
  //for accepting multipart form data
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'video', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  async create(
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
      video?: Express.Multer.File[];
      audio?: Express.Multer.File[];
    },
    @Body() body: CreateEntryDto,
    @Req() { user },
  ) {
    const userId = user.id;
    return await this.diaryService.create(files, body, userId);
  }
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() { user }, @Query('mood') mood?: string) {
    const userId = user.id;
    return this.diaryService.findAll(userId, mood);
  }

  @UseGuards(AuthGuard, OwnerGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diaryService.findOne(id);
  }
  @UseGuards(AuthGuard, OwnerGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() newBody: UpdateEntryDto) {
    return this.diaryService.fixOne(id, newBody);
  }
  @UseGuards(AuthGuard, OwnerGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.diaryService.delete(id);
  }
}
