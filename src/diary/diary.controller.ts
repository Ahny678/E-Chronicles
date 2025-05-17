import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { DiaryService } from './diary.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateEntryDto } from './dtos/create-diary.dto';

@Controller('diary')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Get()
  findAll() {
    return [];
  }

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

  @Get(':id')
  findOne() {
    return [];
  }
  @Patch(':id')
  update() {
    return [];
  }

  @Delete(':id')
  delete() {
    return [];
  }
}
