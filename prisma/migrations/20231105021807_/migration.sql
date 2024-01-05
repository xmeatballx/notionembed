/*
  Warnings:

  - You are about to drop the column `pageId` on the `Block` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Block" DROP COLUMN "pageId";

-- AlterTable
ALTER TABLE "Embed" ADD COLUMN     "pageIds" TEXT[];
