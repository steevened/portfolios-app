/*
  Warnings:

  - The primary key for the `Draft` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `projectId` on the `Draft` table. All the data in the column will be lost.
  - The required column `id` was added to the `Draft` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_id_fkey";

-- DropIndex
DROP INDEX "Draft_projectId_key";

-- AlterTable
ALTER TABLE "Draft" DROP CONSTRAINT "Draft_pkey",
DROP COLUMN "projectId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Draft_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "drafId" TEXT;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_drafId_fkey" FOREIGN KEY ("drafId") REFERENCES "Draft"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
