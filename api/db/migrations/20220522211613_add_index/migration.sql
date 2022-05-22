/*
  Warnings:

  - A unique constraint covering the columns `[priority]` on the table `StoryOrderPriority` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "StoryOrderPriority_priority_key" ON "StoryOrderPriority"("priority");

-- CreateIndex
CREATE INDEX "StoryOrderPriority_projectId_priority_idx" ON "StoryOrderPriority"("projectId", "priority");
