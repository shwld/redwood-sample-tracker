/*
  Warnings:

  - Added the required column `projectId` to the `StoryOrderPriority` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StoryOrderPriority" ADD COLUMN     "projectId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "StoryOrderPriority" ADD CONSTRAINT "StoryOrderPriority_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
