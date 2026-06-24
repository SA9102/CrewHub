-- CreateTable
CREATE TABLE "OrganisationsOnTeams" (
    "organisationId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,

    CONSTRAINT "OrganisationsOnTeams_pkey" PRIMARY KEY ("organisationId","teamId")
);

-- AddForeignKey
ALTER TABLE "OrganisationsOnTeams" ADD CONSTRAINT "OrganisationsOnTeams_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganisationsOnTeams" ADD CONSTRAINT "OrganisationsOnTeams_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
