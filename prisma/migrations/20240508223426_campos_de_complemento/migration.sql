/*
  Warnings:

  - Made the column `logradouro` on table `endereco` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `endereco` ADD COLUMN `complemento` VARCHAR(191) NULL,
    MODIFY `logradouro` CHAR(100) NOT NULL;
