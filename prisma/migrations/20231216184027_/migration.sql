-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_drafId_fkey";

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_drafId_fkey" FOREIGN KEY ("drafId") REFERENCES "Draft"("id") ON DELETE SET NULL ON UPDATE CASCADE;
