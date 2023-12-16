/*
  Warnings:

  - You are about to drop the column `drafId` on the `Project` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_drafId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "drafId",
ADD COLUMN     "draftId" TEXT;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_draftId_fkey" FOREIGN KEY ("draftId") REFERENCES "Draft"("id") ON DELETE SET NULL ON UPDATE CASCADE;
