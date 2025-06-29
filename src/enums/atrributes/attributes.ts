// src/enums/attributes/attributes.ts

// export {
//   MusicGenre,
//   Personality,
//   Religion,
//   Age,
//   Gender,
//   Creative,
// } from '@prisma/client';

export enum MusicGenre {
  Pop = 'Pop',
  Rock = 'Rock',
  Classical = 'Classical',
  Jazz = 'Jazz',
  Afrobeat = 'Afrobeat',
}

export enum Personality {
  Introvert = 'Introvert',
  Extrovert = 'Extrovert',
  Ambivert = 'Ambivert',
}

export enum Religion {
  Christian = 'Christian',
  Muslim = 'Muslim',
  Buddhist = 'Buddhist',
  Atheist = 'Atheist',
  Other = 'Other',
}
export enum Age {
  Age13to17 = 'Age13to17',
  Age18to25 = 'Age18to25',
  Age26to35 = 'Age26to35',
  Age36to45 = 'Age36to45',
  Age46Above = 'Age46Above',
}
export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

export enum Creative {
  Writing = 'Writing',
  Photography = 'Photography',
  Illustration = 'Illustration',
  FashionDesign = 'Fashion Design',
  Filmmaking = 'Filmmaking',
  Choreography = 'Choreography',
  Music = 'Music',
  Handcraft = 'Handcraft',
  Poetry = 'Poetry',
}
