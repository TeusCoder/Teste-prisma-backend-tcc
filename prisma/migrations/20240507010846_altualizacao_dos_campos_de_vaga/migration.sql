/*
  Warnings:

  - Added the required column `categoria` to the `Vaga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titulo` to the `Vaga` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `vaga` ADD COLUMN `categoria` CHAR(100) NOT NULL,
    ADD COLUMN `titulo` CHAR(100) NOT NULL;
