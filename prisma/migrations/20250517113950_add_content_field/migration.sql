/*
  Warnings:

  - Added the required column `content` to the `DiaryEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DiaryEntry" ADD COLUMN     "content" TEXT NOT NULL;
