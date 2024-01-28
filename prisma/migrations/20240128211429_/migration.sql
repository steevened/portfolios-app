/*
  Warnings:

  - The primary key for the `DeveloperRole` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `developerId` on the `DeveloperRole` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `DeveloperRole` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `DeveloperRole` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `DeveloperRole` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roleId` to the `DeveloperRole` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `DeveloperRole` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DeveloperRole" DROP CONSTRAINT "DeveloperRole_developerId_fkey";

-- DropIndex
DROP INDEX "DeveloperRole_developerId_key";

-- DropIndex
DROP INDEX "DeveloperRole_name_key";

-- AlterTable
ALTER TABLE "DeveloperRole" DROP CONSTRAINT "DeveloperRole_pkey",
DROP COLUMN "developerId",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "roleId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "DeveloperRole_pkey" PRIMARY KEY ("userId", "roleId");

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DeveloperRole_userId_key" ON "DeveloperRole"("userId");

-- AddForeignKey
ALTER TABLE "DeveloperRole" ADD CONSTRAINT "DeveloperRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeveloperRole" ADD CONSTRAINT "DeveloperRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
