/*
  Warnings:

  - You are about to alter the column `dataInscricao` on the `candidatovaga` table. The data in that column could be lost. The data in that column will be cast from `DateTime(6)` to `DateTime(3)`.
  - You are about to alter the column `dataCriacao` on the `criarvaga` table. The data in that column could be lost. The data in that column will be cast from `DateTime(6)` to `DateTime(3)`.
  - You are about to alter the column `dataNascimento` on the `usercandidato` table. The data in that column could be lost. The data in that column will be cast from `DateTime(6)` to `DateTime(3)`.
  - You are about to alter the column `dataAbertura` on the `vaga` table. The data in that column could be lost. The data in that column will be cast from `DateTime(6)` to `DateTime(3)`.
  - You are about to alter the column `dataFechamento` on the `vaga` table. The data in that column could be lost. The data in that column will be cast from `DateTime(6)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `candidatovaga` MODIFY `dataInscricao` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `criarvaga` MODIFY `dataCriacao` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `usercandidato` MODIFY `dataNascimento` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `vaga` MODIFY `dataAbertura` DATETIME(3) NOT NULL,
    MODIFY `dataFechamento` DATETIME(3) NOT NULL;
