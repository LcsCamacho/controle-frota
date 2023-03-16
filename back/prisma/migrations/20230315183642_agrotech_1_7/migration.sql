/*
  Warnings:

  - You are about to drop the `viagem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `viagem` DROP FOREIGN KEY `Viagem_DriverId_fkey`;

-- DropForeignKey
ALTER TABLE `viagem` DROP FOREIGN KEY `Viagem_VehicleId_fkey`;

-- DropTable
DROP TABLE `viagem`;

-- CreateTable
CREATE TABLE `trip` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `VehicleId` INTEGER NOT NULL,
    `DriverId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `trip` ADD CONSTRAINT `trip_VehicleId_fkey` FOREIGN KEY (`VehicleId`) REFERENCES `vehicle`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trip` ADD CONSTRAINT `trip_DriverId_fkey` FOREIGN KEY (`DriverId`) REFERENCES `driver`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
