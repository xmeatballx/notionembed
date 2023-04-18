-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "bot_id" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "family" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Embed" (
    "id" TEXT NOT NULL,
    "forUser" TEXT NOT NULL,

    CONSTRAINT "Embed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Block" (
    "id" TEXT NOT NULL,
    "databaseId" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "propertyType" TEXT NOT NULL,
    "previewElement" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "staticEmbedId" TEXT NOT NULL,

    CONSTRAINT "Block_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Block_staticEmbedId_key" ON "Block"("staticEmbedId");

-- AddForeignKey
ALTER TABLE "Embed" ADD CONSTRAINT "Embed_forUser_fkey" FOREIGN KEY ("forUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_staticEmbedId_fkey" FOREIGN KEY ("staticEmbedId") REFERENCES "Embed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
