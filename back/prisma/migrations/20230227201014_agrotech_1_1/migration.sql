/*
  Warnings:

  - You are about to drop the column `carId` on the `maintenance` table. All the data in the column will be lost.
  - You are about to drop the column `carId` on the `operations` table. All the data in the column will be lost.
  - You are about to drop the `car` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `VehicleId` to the `maintenance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `VehicleId` to the `operations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `maintenance` DROP FOREIGN KEY `maintenance_carId_fkey`;

-- DropForeignKey
ALTER TABLE `operations` DROP FOREIGN KEY `operations_carId_fkey`;

-- AlterTable
ALTER TABLE `maintenance` DROP COLUMN `carId`,
    ADD COLUMN `VehicleId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `operations` DROP COLUMN `carId`,
    ADD COLUMN `VehicleId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `car`;

-- CreateTable
CREATE TABLE `vehicle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `model` VARCHAR(191) NOT NULL,
    `plate` VARCHAR(191) NOT NULL,
    `avaliable` BOOLEAN NOT NULL DEFAULT true,
    `type` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `vehicle_plate_key`(`plate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `maintenance` ADD CONSTRAINT `maintenance_VehicleId_fkey` FOREIGN KEY (`VehicleId`) REFERENCES `vehicle`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `operations` ADD CONSTRAINT `operations_VehicleId_fkey` FOREIGN KEY (`VehicleId`) REFERENCES `vehicle`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
