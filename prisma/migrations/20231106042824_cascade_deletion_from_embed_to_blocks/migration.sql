-- DropForeignKey
ALTER TABLE "Block" DROP CONSTRAINT "Block_staticEmbedId_fkey";

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_staticEmbedId_fkey" FOREIGN KEY ("staticEmbedId") REFERENCES "Embed"("id") ON DELETE CASCADE ON UPDATE CASCADE;
