// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import {
  MusicGenre,
  Personality,
  Religion,
  Age,
  Gender,
  Creative,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const users = [
    // ✅ Perfect Matches
    {
      name: 'LiamPerfect',
      email: 'liam.perfect@example.com',
      password: 'password',
      attributes: {
        musicGenre: 'Rock',
        personality: 'Ambivert',
        religion: 'Atheist',
        age: 'Age18to25',
        gender: 'Male',
        creative: 'Poetry',
      },
      preferences: {
        musicGenre: 'Rock',
        personality: 'Ambivert',
        religion: 'Atheist',
        age: 'Age18to25',
        gender: 'Female',
        creative: 'Poetry',
      },
    },
    {
      name: 'EthanPerfect',
      email: 'ethan.perfect@example.com',
      password: 'password',
      attributes: {
        musicGenre: 'Rock',
        personality: 'Ambivert',
        religion: 'Atheist',
        age: 'Age18to25',
        gender: 'Male',
        creative: 'Poetry',
      },
      preferences: {
        musicGenre: 'Rock',
        personality: 'Ambivert',
        religion: 'Atheist',
        age: 'Age18to25',
        gender: 'Female',
        creative: 'Poetry',
      },
    },
    {
      name: 'NoahPerfect',
      email: 'noah.perfect@example.com',
      password: 'password',
      attributes: {
        musicGenre: 'Rock',
        personality: 'Ambivert',
        religion: 'Atheist',
        age: 'Age18to25',
        gender: 'Male',
        creative: 'Poetry',
      },
      preferences: {
        musicGenre: 'Rock',
        personality: 'Ambivert',
        religion: 'Atheist',
        age: 'Age18to25',
        gender: 'Female',
        creative: 'Poetry',
      },
    },

    // 👍 Good Matches
    {
      name: 'BenGoodMatch',
      email: 'ben.good@example.com',
      password: 'password',
      attributes: {
        musicGenre: 'Rock',
        personality: 'Ambivert',
        religion: 'Christian',
        age: 'Age18to25',
        gender: 'Male',
        creative: 'Poetry',
      },
      preferences: {
        musicGenre: 'Rock',
        personality: 'Introvert',
        religion: 'Atheist',
        age: 'Age18to25',
        gender: 'Female',
        creative: 'Poetry',
      },
    },
    {
      name: 'AidenGoodMatch',
      email: 'aiden.good@example.com',
      password: 'password',
      attributes: {
        musicGenre: 'Rock',
        personality: 'Extrovert',
        religion: 'Atheist',
        age: 'Age18to25',
        gender: 'Male',
        creative: 'Writing',
      },
      preferences: {
        musicGenre: 'Rock',
        personality: 'Ambivert',
        religion: 'Atheist',
        age: 'Age18to25',
        gender: 'Female',
        creative: 'Poetry',
      },
    },

    // 😐 Average Matches
    {
      name: 'JayAverage',
      email: 'jay.average@example.com',
      password: 'password',
      attributes: {
        musicGenre: 'Jazz',
        personality: 'Ambivert',
        religion: 'Atheist',
        age: 'Age26to35',
        gender: 'Male',
        creative: 'Filmmaking',
      },
      preferences: {
        musicGenre: 'Rock',
        personality: 'Extrovert',
        religion: 'Christian',
        age: 'Age18to25',
        gender: 'Female',
        creative: 'Poetry',
      },
    },
    {
      name: 'MasonAverage',
      email: 'mason.average@example.com',
      password: 'password',
      attributes: {
        musicGenre: 'Rock',
        personality: 'Introvert',
        religion: 'Other',
        age: 'Age18to25',
        gender: 'Male',
        creative: 'FashionDesign',
      },
      preferences: {
        musicGenre: 'Jazz',
        personality: 'Ambivert',
        religion: 'Atheist',
        age: 'Age18to25',
        gender: 'Female',
        creative: 'Poetry',
      },
    },

    // ❌ Bad Matches
    {
      name: 'TylerBadMatch',
      email: 'tyler.bad@example.com',
      password: 'password',
      attributes: {
        musicGenre: 'Afrobeat',
        personality: 'Extrovert',
        religion: 'Muslim',
        age: 'Age36to45',
        gender: 'Male',
        creative: 'Choreography',
      },
      preferences: {
        musicGenre: 'Afrobeat',
        personality: 'Extrovert',
        religion: 'Muslim',
        age: 'Age36to45',
        gender: 'Female',
        creative: 'Choreography',
      },
    },
    {
      name: 'LoganBadMatch',
      email: 'logan.bad@example.com',
      password: 'password',
      attributes: {
        musicGenre: 'Classical',
        personality: 'Introvert',
        religion: 'Christian',
        age: 'Age46Above',
        gender: 'Male',
        creative: 'Filmmaking',
      },
      preferences: {
        musicGenre: 'Afrobeat',
        personality: 'Extrovert',
        religion: 'Muslim',
        age: 'Age46Above',
        gender: 'Female',
        creative: 'FashionDesign',
      },
    },
    {
      name: 'NathanBadMatch',
      email: 'nathan.bad@example.com',
      password: 'password',
      attributes: {
        musicGenre: 'Country',
        personality: 'Extrovert',
        religion: 'Christian',
        age: 'Age13to17',
        gender: 'Male',
        creative: 'Handcraft',
      },
      preferences: {
        musicGenre: 'Jazz',
        personality: 'Introvert',
        religion: 'Other',
        age: 'Age13to17',
        gender: 'Female',
        creative: 'Illustration',
      },
    },
  ];

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const createdUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        Attributes: {
          create: {
            musicGenre:
              MusicGenre[user.attributes.musicGenre as keyof typeof MusicGenre],
            personality:
              Personality[
                user.attributes.personality as keyof typeof Personality
              ],
            religion:
              Religion[user.attributes.religion as keyof typeof Religion],
            age: Age[user.attributes.age as keyof typeof Age],
            gender: Gender[user.attributes.gender as keyof typeof Gender],
            creative:
              Creative[user.attributes.creative as keyof typeof Creative],
          },
        },
        Preferences: {
          create: {
            musicGenre:
              MusicGenre[
                user.preferences.musicGenre as keyof typeof MusicGenre
              ],
            personality:
              Personality[
                user.preferences.personality as keyof typeof Personality
              ],
            religion:
              Religion[user.preferences.religion as keyof typeof Religion],
            age: Age[user.preferences.age as keyof typeof Age],
            gender: Gender[user.preferences.gender as keyof typeof Gender],
            creative:
              Creative[user.preferences.creative as keyof typeof Creative],
          },
        },
      },
    });

    console.log(`Created user: ${createdUser.name}`);
  }
}

main()
  .then(() => {
    console.log('Seeding complete.');
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect();
  });
