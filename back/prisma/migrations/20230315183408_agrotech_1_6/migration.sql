-- CreateTable
CREATE TABLE `Viagem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `VehicleId` INTEGER NOT NULL,
    `DriverId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Viagem` ADD CONSTRAINT `Viagem_VehicleId_fkey` FOREIGN KEY (`VehicleId`) REFERENCES `vehicle`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Viagem` ADD CONSTRAINT `Viagem_DriverId_fkey` FOREIGN KEY (`DriverId`) REFERENCES `driver`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
