/*
  Warnings:

  - You are about to drop the column `github` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `linkedin` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `twitter` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "github",
DROP COLUMN "linkedin",
DROP COLUMN "twitter",
DROP COLUMN "website";

-- CreateTable
CREATE TABLE "ProfileLinks" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "github" TEXT,
    "linkedin" TEXT,
    "twitter" TEXT,
    "website" TEXT,

    CONSTRAINT "ProfileLinks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProfileLinks_profileId_key" ON "ProfileLinks"("profileId");

-- AddForeignKey
ALTER TABLE "ProfileLinks" ADD CONSTRAINT "ProfileLinks_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
