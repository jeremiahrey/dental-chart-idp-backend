/*
  Warnings:

  - You are about to drop the column `birrthDate` on the `Patient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "birrthDate",
ADD COLUMN     "birthDate" TIMESTAMP(3);
