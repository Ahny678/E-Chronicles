import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

import { SignupDto } from 'src/auth/dtos/signup.dto';
import { MailerService } from 'src/mailer/mailer.service';
@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    private mailerService: MailerService,
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
}
