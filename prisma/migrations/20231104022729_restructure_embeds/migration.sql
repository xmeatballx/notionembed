/*
  Warnings:

  - You are about to drop the column `databaseId` on the `Block` table. All the data in the column will be lost.
  - You are about to drop the column `hi` on the `User` table. All the data in the column will be lost.
  - Added the required column `order` to the `Block` table without a default value. This is not possible if the table is not empty.
  - Added the required column `databaseId` to the `Embed` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Block" DROP COLUMN "databaseId",
ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Embed" ADD COLUMN     "databaseId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "hi";
