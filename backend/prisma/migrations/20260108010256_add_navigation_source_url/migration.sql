/*
  Warnings:

  - Added the required column `sourceUrl` to the `Navigation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Navigation" ADD COLUMN     "sourceUrl" TEXT NOT NULL;
