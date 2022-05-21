/*
  Warnings:

  - You are about to drop the column `isIcebox` on the `Story` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "StoryPosition" AS ENUM ('DONE', 'CURRENT', 'BACKLOG', 'ICEBOX');

-- AlterTable
ALTER TABLE "Story" DROP COLUMN "isIcebox",
ADD COLUMN     "position" "StoryPosition" NOT NULL DEFAULT E'ICEBOX';
