/*
  Warnings:

  - You are about to drop the `InviteToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "InviteToken";

-- CreateTable
CREATE TABLE "InviteLink" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "expires" TEXT NOT NULL,

    CONSTRAINT "InviteLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InviteLink_email_key" ON "InviteLink"("email");
