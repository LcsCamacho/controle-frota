

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `management` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `user_password_key`(`password`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `driver` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `available` BOOLEAN NOT NULL DEFAULT true,
    `cnh` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `driver_cnh_key`(`cnh`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `car` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `model` VARCHAR(191) NOT NULL,
    `plate` VARCHAR(191) NOT NULL,
    `available` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `car_plate_key`(`plate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `maintenance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `cost` DOUBLE NOT NULL,
    `carId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `operationsId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `operations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `driverId` INTEGER NOT NULL,
    `carId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `maintenance` ADD CONSTRAINT `maintenance_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `car`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `maintenance` ADD CONSTRAINT `maintenance_operationsId_fkey` FOREIGN KEY (`operationsId`) REFERENCES `operations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `operations` ADD CONSTRAINT `operations_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `driver`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `operations` ADD CONSTRAINT `operations_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `car`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
