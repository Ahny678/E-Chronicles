import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { DiaryService } from './diary.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateEntryDto } from './dtos/create-diary.dto';
import { UpdateEntryDto } from './dtos/update-diary.dto';

@Controller('diary')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

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
  ) {
    return await this.diaryService.create(files, body);
  }

  @Get()
  findAll(@Query('mood') mood?: string) {
    return this.diaryService.findAll(mood);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diaryService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() newBody: UpdateEntryDto) {
    return this.diaryService.fixOne(id, newBody);
  }

  @Delete(':id')
  delete() {
    return [];
  }
}
