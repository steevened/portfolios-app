-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "githubUrl" TEXT,
ADD COLUMN     "liveUrl" TEXT,
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "description" DROP NOT NULL;
