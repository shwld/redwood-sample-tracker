/*
  Warnings:

  - You are about to drop the column `currentVerocity` on the `Project` table. All the data in the column will be lost.
  - Added the required column `currentVelocity` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "currentVerocity",
ADD COLUMN     "currentVelocity" INTEGER NOT NULL;
