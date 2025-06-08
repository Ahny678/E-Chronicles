import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

import { SignupDto } from 'src/auth/dtos/signup.dto';
@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

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
      return { name, email };
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Error creating user:', err.message); // safe access
      } else {
        console.error('Unknown error creating user', err); // safe fallback
      }

      throw new InternalServerErrorException('Failed to create user');
    }
  }
  async findByEmail(email: string) {
    return this.prismaService.user.findUnique({ where: { email } });
  }
}
