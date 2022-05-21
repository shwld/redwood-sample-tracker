/*
  Warnings:

  - You are about to drop the column `type` on the `Story` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "StoryKind" AS ENUM ('FEATURE', 'BUG', 'CHORE', 'RELEASE');

-- AlterTable
ALTER TABLE "Story" DROP COLUMN "type",
ADD COLUMN     "kind" "StoryKind" NOT NULL DEFAULT E'FEATURE';

-- DropEnum
DROP TYPE "StoryType";
