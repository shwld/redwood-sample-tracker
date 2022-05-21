/*
  Warnings:

  - You are about to drop the `StoryOrder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StoryOrder" DROP CONSTRAINT "StoryOrder_storyId_fkey";

-- DropTable
DROP TABLE "StoryOrder";

-- CreateTable
CREATE TABLE "StoryOrderPriority" (
    "storyId" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StoryOrderPriority_pkey" PRIMARY KEY ("storyId")
);

-- AddForeignKey
ALTER TABLE "StoryOrderPriority" ADD CONSTRAINT "StoryOrderPriority_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
