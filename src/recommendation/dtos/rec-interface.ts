import { Prisma } from '@prisma/client';

export type UserWithPreferences = Prisma.UserGetPayload<{
  include: {
    Attributes: true;
    Preferences: true;
  };
}>;

export interface Attributes {
  musicGenre: string;
  personality: string;
  religion: string;
  age: string;
  gender: string;
  creative: string;
}

export interface Match {
  userId: string;
  score: number;
}
