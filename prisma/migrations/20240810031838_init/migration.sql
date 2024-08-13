/*
  Warnings:

  - You are about to drop the `Picture` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Entry" ADD COLUMN "imagePath" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Picture";
PRAGMA foreign_keys=on;
