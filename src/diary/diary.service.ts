import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEntryDto } from './dtos/create-diary.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UpdateEntryDto } from './dtos/update-diary.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { userInfo } from 'os';

@Injectable()
export class DiaryService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async create(
    files: {
      image?: Express.Multer.File[];
      video?: Express.Multer.File[];
      audio?: Express.Multer.File[];
    },
    body: CreateEntryDto,
    userId: string,
  ) {
    try {
      // Initialize URLs for media
      let imageUrl: string | undefined;
      let videoUrl: string | undefined;
      let audioUrl: string | undefined;

      if (files.image && files.image[0]) {
        const uploadResult = await this.cloudinary.uploadFile(
          files.image[0],
          'images',
          'image',
        );
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        imageUrl = uploadResult.secure_url;
      }

      if (files.video && files.video[0]) {
        const uploadResult = await this.cloudinary.uploadFile(
          files.video[0],
          'videos',
          'video',
        );
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        videoUrl = uploadResult.secure_url;
      }

      if (files.audio && files.audio[0]) {
        const uploadResult = await this.cloudinary.uploadFile(
          files.audio[0],
          'audios',
          'auto', // 'auto' lets Cloudinary detect the type
        );
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        audioUrl = uploadResult.secure_url;
      }

      // Create diary entry in the database
      const diaryEntry = await this.prismaService.diaryEntry.create({
        data: {
          title: body.title,
          mood: body.mood,
          content: body.content,
          image: imageUrl,
          video: videoUrl,
          audio: audioUrl,
          userId: userId,
        },
      });

      return diaryEntry;
    } catch (error) {
      console.error('Error creating diary entry:', error);
      throw new InternalServerErrorException('Failed to create diary entry');
    }
  }

  async findAll(userId: string, mood?: string) {
    return await this.prismaService.diaryEntry.findMany({
      where: {
        userId,
        ...(mood ? { mood } : {}),
      },
    });
  }

  async findOne(id: string) {
    const entry = await this.prismaService.diaryEntry.findUnique({
      where: { id },
    });
    if (!entry) {
      return 'Entry does not exit';
    }
    return entry;
  }
  async fixOne(id: string, newBody: UpdateEntryDto) {
    return await this.prismaService.diaryEntry.update({
      where: { id },
      data: newBody,
    });
  }
  async delete(id: string) {
    try {
      const deletedEntry = await this.prismaService.diaryEntry.delete({
        where: { id },
      });
      return deletedEntry;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        // Record not found
        throw new Error(`Diary entry with id '${id}' does not exist.`);
      }
    }
  }
}
