/*
  Warnings:

  - You are about to drop the column `position` on the `Story` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "StoryOrderPriority_projectId_priority_idx";

-- AlterTable
ALTER TABLE "Story" DROP COLUMN "position";

-- AlterTable
ALTER TABLE "StoryOrderPriority" ADD COLUMN     "position" "StoryPosition" NOT NULL DEFAULT E'ICEBOX';

-- CreateIndex
CREATE INDEX "StoryOrderPriority_projectId_position_priority_idx" ON "StoryOrderPriority"("projectId", "position", "priority");
