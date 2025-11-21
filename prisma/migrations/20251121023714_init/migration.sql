-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "birrthDate" TIMESTAMP(3),
    "email" TEXT,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DentalChart" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "visitDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visitType" TEXT,
    "page1Completed" BOOLEAN NOT NULL DEFAULT false,
    "page2Completed" BOOLEAN NOT NULL DEFAULT false,
    "page3Completed" BOOLEAN NOT NULL DEFAULT false,
    "page4Completed" BOOLEAN NOT NULL DEFAULT false,
    "page1Verified" BOOLEAN NOT NULL DEFAULT false,
    "page2Verified" BOOLEAN NOT NULL DEFAULT false,
    "page3Verified" BOOLEAN NOT NULL DEFAULT false,
    "page4Verified" BOOLEAN NOT NULL DEFAULT false,
    "page1Data" JSONB,
    "page2Data" JSONB,
    "page3Data" JSONB,
    "page4Data" JSONB,
    "page1ImageUrl" TEXT,
    "page2ImageUrl" TEXT,
    "page3ImageUrl" TEXT,
    "page4ImageUrl" TEXT,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DentalChart_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_email_key" ON "Patient"("email");

-- CreateIndex
CREATE INDEX "Patient_firstName_lastName_idx" ON "Patient"("firstName", "lastName");

-- CreateIndex
CREATE INDEX "Patient_email_idx" ON "Patient"("email");

-- CreateIndex
CREATE INDEX "DentalChart_patientId_idx" ON "DentalChart"("patientId");

-- CreateIndex
CREATE INDEX "DentalChart_visitDate_idx" ON "DentalChart"("visitDate");

-- CreateIndex
CREATE INDEX "DentalChart_isCompleted_idx" ON "DentalChart"("isCompleted");

-- AddForeignKey
ALTER TABLE "DentalChart" ADD CONSTRAINT "DentalChart_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
