/*
  Warnings:

  - You are about to drop the `OrganisationsOnTeams` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `organisationId` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrganisationsOnTeams" DROP CONSTRAINT "OrganisationsOnTeams_organisationId_fkey";

-- DropForeignKey
ALTER TABLE "OrganisationsOnTeams" DROP CONSTRAINT "OrganisationsOnTeams_teamId_fkey";

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "organisationId" TEXT NOT NULL;

-- DropTable
DROP TABLE "OrganisationsOnTeams";

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
