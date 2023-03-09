/*
  Warnings:

  - Made the column `createdAt` on table `maintenance` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `maintenance` ADD COLUMN `checkin` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `checkout` DATETIME(3) NULL,
    MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
