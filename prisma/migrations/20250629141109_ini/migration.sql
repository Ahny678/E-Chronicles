-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "MusicGenre" AS ENUM ('Pop', 'Rock', 'Classical', 'Jazz', 'Afrobeat');

-- CreateEnum
CREATE TYPE "Personality" AS ENUM ('Introvert', 'Extrovert', 'Ambivert');

-- CreateEnum
CREATE TYPE "Religion" AS ENUM ('Christian', 'Muslim', 'Buddhist', 'Atheist', 'Other');

-- CreateEnum
CREATE TYPE "Age" AS ENUM ('Age13to17', 'Age18to25', 'Age26to35', 'Age36to45', 'Age46Above');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Other');

-- CreateEnum
CREATE TYPE "Creative" AS ENUM ('Writing', 'Photography', 'Illustration', 'FashionDesign', 'Filmmaking', 'Choreography', 'Music', 'Handcraft', 'Poetry');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiaryEntry" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "mood" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT,
    "video" TEXT,
    "audio" TEXT,
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "DiaryEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attributes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "musicGenre" "MusicGenre" NOT NULL,
    "personality" "Personality" NOT NULL,
    "religion" "Religion" NOT NULL,
    "age" "Age" NOT NULL,
    "gender" "Gender" NOT NULL,
    "creative" "Creative" NOT NULL,

    CONSTRAINT "Attributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Preferences" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "musicGenre" "MusicGenre" NOT NULL,
    "personality" "Personality" NOT NULL,
    "religion" "Religion" NOT NULL,
    "age" "Age" NOT NULL,
    "gender" "Gender" NOT NULL,
    "creative" "Creative" NOT NULL,

    CONSTRAINT "Preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PenpalRequest" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PenpalRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PenpalConnection" (
    "id" TEXT NOT NULL,
    "user1Id" TEXT NOT NULL,
    "user2Id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PenpalConnection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Attributes_userId_key" ON "Attributes"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Preferences_userId_key" ON "Preferences"("userId");

-- AddForeignKey
ALTER TABLE "DiaryEntry" ADD CONSTRAINT "DiaryEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attributes" ADD CONSTRAINT "Attributes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Preferences" ADD CONSTRAINT "Preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PenpalRequest" ADD CONSTRAINT "PenpalRequest_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PenpalRequest" ADD CONSTRAINT "PenpalRequest_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PenpalConnection" ADD CONSTRAINT "PenpalConnection_user1Id_fkey" FOREIGN KEY ("user1Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PenpalConnection" ADD CONSTRAINT "PenpalConnection_user2Id_fkey" FOREIGN KEY ("user2Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
