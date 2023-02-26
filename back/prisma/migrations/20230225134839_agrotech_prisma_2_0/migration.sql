/*
  Warnings:

  - You are about to drop the column `available` on the `car` table. All the data in the column will be lost.
  - You are about to drop the column `available` on the `driver` table. All the data in the column will be lost.
  - You are about to drop the column `operationsId` on the `maintenance` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `maintenance` DROP FOREIGN KEY `maintenance_operationsId_fkey`;

-- AlterTable
ALTER TABLE `car` DROP COLUMN `available`,
    ADD COLUMN `avaliable` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `driver` DROP COLUMN `available`,
    ADD COLUMN `avaliable` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `maintenance` DROP COLUMN `operationsId`;
