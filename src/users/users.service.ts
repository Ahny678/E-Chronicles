import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

import { SignupDto } from 'src/auth/dtos/signup.dto';
import { MailerService } from 'src/mailer/mailer.service';
import { RecommendationService } from 'src/recommendation/recommendation.service';

//* TO SOLVE CONFLICT BETWEEN PRISMA AND TYPESCRIPT ENUMS FOR API DOCUMENTATION */
import {
  MusicGenre as AppMusicGenre,
  Personality as AppPersonality,
  Religion as AppReligion,
  Age as AppAge,
  Gender as AppGender,
  Creative as AppCreative,
} from 'src/enums/atrributes/attributes';

/* */

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    private mailerService: MailerService,
    private matchService: RecommendationService,
  ) {}

  async createuser(data: SignupDto) {
    try {
      const { name, email, password } = data;

      const hashedPassword: string = await bcrypt.hash(password, 10);

      await this.prismaService.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      await this.mailerService.sendEmail({
        receipients: [{ name, address: email }],
        subject: '🎉 Welcome to Our App!',
        html: `<h1>Hi ${name},</h1><p>Your account was created successfully.</p>`,
      });

      return { name, email };
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Error creating user:', err.message);
      } else {
        console.error('Unknown error creating user', err);
      }

      throw new InternalServerErrorException('Failed to create user');
    }
  }
  async findByEmail(email: string) {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  async updateAttributes(userId, dto) {
    const updatedUserAttr = await this.prismaService.attributes.upsert({
      where: { userId },
      //If such a record exists, the update block will be used. If not, the create block will be used.
      update: { ...dto },
      create: {
        userId,
        ...dto,
      },
    });
    return {
      id: updatedUserAttr.id,
      userId: updatedUserAttr.userId,
      musicGenre: updatedUserAttr.musicGenre as AppMusicGenre,
      personality: updatedUserAttr.personality as AppPersonality,
      religion: updatedUserAttr.religion as AppReligion,
      age: updatedUserAttr.age as AppAge,
      gender: updatedUserAttr.gender as AppGender,
      creative: updatedUserAttr.creative as AppCreative,
    };
  }
  async updatePreferences(userId, dto) {
    const updatedUserPref = await this.prismaService.preferences.upsert({
      where: { userId },
      update: { ...dto },
      create: {
        userId,
        ...dto,
      },
    });
    return {
      id: updatedUserPref.id,
      userId: updatedUserPref.userId,
      musicGenre: updatedUserPref.musicGenre as AppMusicGenre,
      personality: updatedUserPref.personality as AppPersonality,
      religion: updatedUserPref.religion as AppReligion,
      age: updatedUserPref.age as AppAge,
      gender: updatedUserPref.gender as AppGender,
      creative: updatedUserPref.creative as AppCreative,
    };
  }
  async getTopFiveMatches(userId) {
    const users = await this.prismaService.user.findMany({
      include: {
        Attributes: true,
        Preferences: true,
      },
    });
    const currentUser = users.find((user) => user.id === userId);

    if (!currentUser) {
      throw new Error(`User with ID ${userId} not found`);
    }
    return this.matchService.evaluateMatches(currentUser, users);
  }
}

//view top 5 matches
