-- CreateEnum
CREATE TYPE "EmbedLayouts" AS ENUM ('SINGLE', 'CAROUSEL');

-- CreateEnum
CREATE TYPE "AutoplayOrder" AS ENUM ('RANDOM', 'ASC', 'DESC');

-- AlterTable
ALTER TABLE "Embed" ADD COLUMN     "autoplay" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "autoplayInterval" INTEGER NOT NULL DEFAULT 3,
ADD COLUMN     "autoplayOrder" "AutoplayOrder" NOT NULL DEFAULT 'RANDOM',
ADD COLUMN     "columns" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "layout" "EmbedLayouts" NOT NULL DEFAULT 'SINGLE';
