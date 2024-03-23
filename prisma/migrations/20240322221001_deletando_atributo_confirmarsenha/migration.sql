/*
  Warnings:

  - You are about to drop the column `confirmarSenha` on the `usercandidato` table. All the data in the column will be lost.
  - You are about to drop the column `confirmarSenha` on the `userempresa` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `usercandidato` DROP COLUMN `confirmarSenha`;

-- AlterTable
ALTER TABLE `userempresa` DROP COLUMN `confirmarSenha`;
