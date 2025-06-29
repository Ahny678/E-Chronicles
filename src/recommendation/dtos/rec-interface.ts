import { Prisma, User } from '@prisma/client';
import { UserResponseWithAPDto } from 'src/users/dtos/OpenApiResponse/user-match-response.dto';

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
  user: UserResponseWithAPDto;
  score: number;
}
