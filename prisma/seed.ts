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

const prisma = new PrismaClient();

async function main() {
  const users = [
    // Amy and variants
    {
      name: 'Amy',
      email: 'amy@example.com',
      password: 'password',
      attributes: {
        musicGenre: 'Pop',
        personality: 'Extrovert',
        religion: 'Christian',
        age: 'Age18to25',
        gender: 'Female',
        creative: 'Writing',
      },
      preferences: {
        musicGenre: 'Pop',
        personality: 'Extrovert',
        religion: 'Christian',
        age: 'Age18to25',
        gender: 'Male',
        creative: 'Writing',
      },
    },
    {
      name: 'AmyGoodMatch',
      email: 'amygood@example.com',
      password: 'password',
      attributes: {
        musicGenre: 'Pop',
        personality: 'Extrovert',
        religion: 'Christian',
        age: 'Age18to25',
        gender: 'Male',
        creative: 'Writing',
      },
      preferences: {
        musicGenre: 'Pop',
        personality: 'Extrovert',
        religion: 'Christian',
        age: 'Age18to25',
        gender: 'Female',
        creative: 'Writing',
      },
    },
    {
      name: 'AmyAveMatch',
      email: 'amyave@example.com',
      password: 'password',
      attributes: {
        musicGenre: 'Rock',
        personality: 'Ambivert',
        religion: 'Christian',
        age: 'Age26to35',
        gender: 'Male',
        creative: 'Poetry',
      },
      preferences: {
        musicGenre: 'Pop',
        personality: 'Introvert',
        religion: 'Christian',
        age: 'Age18to25',
        gender: 'Female',
        creative: 'FashionDesign',
      },
    },
    {
      name: 'NotAmyMatch',
      email: 'amybad@example.com',
      password: 'password',
      attributes: {
        musicGenre: 'Afrobeat',
        personality: 'Introvert',
        religion: 'Muslim',
        age: 'Age36to45',
        gender: 'Female',
        creative: 'Choreography',
      },
      preferences: {
        musicGenre: 'Afrobeat',
        personality: 'Introvert',
        religion: 'Muslim',
        age: 'Age36to45',
        gender: 'Male',
        creative: 'Choreography',
      },
    },

    // Bob and variants
    {
      name: 'Bob',
      email: 'bob@example.com',
      password: 'password',
      attributes: {
        musicGenre: 'Jazz',
        personality: 'Introvert',
        religion: 'Buddhist',
        age: 'Age26to35',
        gender: 'Male',
        creative: 'Photography',
      },
      preferences: {
        musicGenre: 'Jazz',
        personality: 'Introvert',
        religion: 'Buddhist',
        age: 'Age26to35',
        gender: 'Female',
        creative: 'Photography',
      },
    },
    {
      name: 'BobGoodMatch',
      email: 'bobgood@example.com',
      password: 'password',
      attributes: {
        musicGenre: 'Jazz',
        personality: 'Introvert',
        religion: 'Buddhist',
        age: 'Age26to35',
        gender: 'Female',
        creative: 'Photography',
      },
      preferences: {
        musicGenre: 'Jazz',
        personality: 'Introvert',
        religion: 'Buddhist',
        age: 'Age26to35',
        gender: 'Male',
        creative: 'Photography',
      },
    },
    {
      name: 'BobAveMatch',
      email: 'bobave@example.com',
      password: 'password',
      attributes: {
        musicGenre: 'Classical',
        personality: 'Extrovert',
        religion: 'Atheist',
        age: 'Age18to25',
        gender: 'Female',
        creative: 'Handcraft',
      },
      preferences: {
        musicGenre: 'Jazz',
        personality: 'Ambivert',
        religion: 'Other',
        age: 'Age26to35',
        gender: 'Male',
        creative: 'Photography',
      },
    },
    {
      name: 'NotBobMatch',
      email: 'bobbad@example.com',
      password: 'password',
      attributes: {
        musicGenre: 'Afrobeat',
        personality: 'Extrovert',
        religion: 'Muslim',
        age: 'Age46Above',
        gender: 'Male',
        creative: 'FashionDesign',
      },
      preferences: {
        musicGenre: 'Rock',
        personality: 'Extrovert',
        religion: 'Christian',
        age: 'Age13to17',
        gender: 'Female',
        creative: 'Filmmaking',
      },
    },

    // Cleo and variants
    {
      name: 'Cleo',
      email: 'cleo@example.com',
      password: 'password',
      attributes: {
        musicGenre: 'Classical',
        personality: 'Ambivert',
        religion: 'Atheist',
        age: 'Age36to45',
        gender: 'Female',
        creative: 'Illustration',
      },
      preferences: {
        musicGenre: 'Classical',
        personality: 'Ambivert',
        religion: 'Atheist',
        age: 'Age36to45',
        gender: 'Male',
        creative: 'Illustration',
      },
    },
    {
      name: 'CleoGoodMatch',
      email: 'cleogood@example.com',
      password: 'password',
      attributes: {
        musicGenre: 'Classical',
        personality: 'Ambivert',
        religion: 'Atheist',
        age: 'Age36to45',
        gender: 'Male',
        creative: 'Illustration',
      },
      preferences: {
        musicGenre: 'Classical',
        personality: 'Ambivert',
        religion: 'Atheist',
        age: 'Age36to45',
        gender: 'Female',
        creative: 'Illustration',
      },
    },
    {
      name: 'CleoAveMatch',
      email: 'cleoave@example.com',
      password: 'password',
      attributes: {
        musicGenre: 'Pop',
        personality: 'Introvert',
        religion: 'Christian',
        age: 'Age18to25',
        gender: 'Male',
        creative: 'Handcraft',
      },
      preferences: {
        musicGenre: 'Jazz',
        personality: 'Ambivert',
        religion: 'Other',
        age: 'Age36to45',
        gender: 'Female',
        creative: 'Poetry',
      },
    },
    {
      name: 'NotCleoMatch',
      email: 'cleobad@example.com',
      password: 'password',
      attributes: {
        musicGenre: 'Afrobeat',
        personality: 'Extrovert',
        religion: 'Muslim',
        age: 'Age13to17',
        gender: 'Female',
        creative: 'Choreography',
      },
      preferences: {
        musicGenre: 'Afrobeat',
        personality: 'Extrovert',
        religion: 'Muslim',
        age: 'Age13to17',
        gender: 'Male',
        creative: 'Choreography',
      },
    },
  ];

  for (const user of users) {
    const createdUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
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
