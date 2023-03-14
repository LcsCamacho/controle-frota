/*
  Warnings:

  - You are about to drop the `operations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `operations` DROP FOREIGN KEY `operations_VehicleId_fkey`;

-- DropForeignKey
ALTER TABLE `operations` DROP FOREIGN KEY `operations_driverId_fkey`;

-- DropTable
DROP TABLE `operations`;
