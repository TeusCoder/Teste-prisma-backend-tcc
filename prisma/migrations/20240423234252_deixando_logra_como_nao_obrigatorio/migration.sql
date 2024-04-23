/*
  Warnings:

  - You are about to alter the column `cep` on the `endereco` table. The data in that column could be lost. The data in that column will be cast from `Char(10)` to `Char(8)`.

*/
-- AlterTable
ALTER TABLE `endereco` MODIFY `estado` CHAR(20) NOT NULL,
    MODIFY `logradouro` VARCHAR(191) NULL,
    MODIFY `cep` CHAR(8) NOT NULL;
