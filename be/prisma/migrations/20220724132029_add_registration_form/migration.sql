-- CreateEnum
CREATE TYPE "RegistrationForm" AS ENUM ('IP', 'OOO', 'ZAO', 'OAO');

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "type" "RegistrationForm" NOT NULL DEFAULT E'IP';
