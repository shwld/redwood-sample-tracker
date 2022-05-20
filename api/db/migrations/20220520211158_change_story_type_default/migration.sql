/*
  Warnings:

  - Made the column `type` on table `Story` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Story" ALTER COLUMN "type" SET NOT NULL,
ALTER COLUMN "type" SET DEFAULT E'FEATURE';
