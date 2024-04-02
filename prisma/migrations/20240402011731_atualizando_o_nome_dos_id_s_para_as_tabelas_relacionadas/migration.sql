/*
  Warnings:

  - You are about to drop the column `candidatoId` on the `candidatovaga` table. All the data in the column will be lost.
  - You are about to drop the column `vagaId` on the `candidatovaga` table. All the data in the column will be lost.
  - You are about to drop the column `EmpresaId` on the `criarvaga` table. All the data in the column will be lost.
  - You are about to drop the column `VagaId` on the `criarvaga` table. All the data in the column will be lost.
  - You are about to drop the column `curriculoId` on the `usercandidato` table. All the data in the column will be lost.
  - You are about to drop the column `enderecoId` on the `usercandidato` table. All the data in the column will be lost.
  - You are about to drop the column `enderecoId` on the `userempresa` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_userCandidato]` on the table `CandidatoVaga` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_vaga]` on the table `CandidatoVaga` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_userEmpresa]` on the table `CriarVaga` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_vaga]` on the table `CriarVaga` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_endereco]` on the table `UserCandidato` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_curriculoForm]` on the table `UserCandidato` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_endereco]` on the table `UserEmpresa` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_userCandidato` to the `CandidatoVaga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_vaga` to the `CandidatoVaga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_userEmpresa` to the `CriarVaga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_vaga` to the `CriarVaga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_curriculoForm` to the `UserCandidato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_endereco` to the `UserCandidato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_endereco` to the `UserEmpresa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `candidatovaga` DROP FOREIGN KEY `CandidatoVaga_candidatoId_fkey`;

-- DropForeignKey
ALTER TABLE `candidatovaga` DROP FOREIGN KEY `CandidatoVaga_vagaId_fkey`;

-- DropForeignKey
ALTER TABLE `criarvaga` DROP FOREIGN KEY `CriarVaga_EmpresaId_fkey`;

-- DropForeignKey
ALTER TABLE `criarvaga` DROP FOREIGN KEY `CriarVaga_VagaId_fkey`;

-- DropForeignKey
ALTER TABLE `usercandidato` DROP FOREIGN KEY `UserCandidato_curriculoId_fkey`;

-- DropForeignKey
ALTER TABLE `usercandidato` DROP FOREIGN KEY `UserCandidato_enderecoId_fkey`;

-- DropForeignKey
ALTER TABLE `userempresa` DROP FOREIGN KEY `UserEmpresa_enderecoId_fkey`;

-- AlterTable
ALTER TABLE `candidatovaga` DROP COLUMN `candidatoId`,
    DROP COLUMN `vagaId`,
    ADD COLUMN `id_userCandidato` VARCHAR(191) NOT NULL,
    ADD COLUMN `id_vaga` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `criarvaga` DROP COLUMN `EmpresaId`,
    DROP COLUMN `VagaId`,
    ADD COLUMN `id_userEmpresa` VARCHAR(191) NOT NULL,
    ADD COLUMN `id_vaga` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `usercandidato` DROP COLUMN `curriculoId`,
    DROP COLUMN `enderecoId`,
    ADD COLUMN `id_curriculoForm` VARCHAR(191) NOT NULL,
    ADD COLUMN `id_endereco` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `userempresa` DROP COLUMN `enderecoId`,
    ADD COLUMN `id_endereco` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `CandidatoVaga_id_userCandidato_key` ON `CandidatoVaga`(`id_userCandidato`);

-- CreateIndex
CREATE UNIQUE INDEX `CandidatoVaga_id_vaga_key` ON `CandidatoVaga`(`id_vaga`);

-- CreateIndex
CREATE UNIQUE INDEX `CriarVaga_id_userEmpresa_key` ON `CriarVaga`(`id_userEmpresa`);

-- CreateIndex
CREATE UNIQUE INDEX `CriarVaga_id_vaga_key` ON `CriarVaga`(`id_vaga`);

-- CreateIndex
CREATE UNIQUE INDEX `UserCandidato_id_endereco_key` ON `UserCandidato`(`id_endereco`);

-- CreateIndex
CREATE UNIQUE INDEX `UserCandidato_id_curriculoForm_key` ON `UserCandidato`(`id_curriculoForm`);

-- CreateIndex
CREATE UNIQUE INDEX `UserEmpresa_id_endereco_key` ON `UserEmpresa`(`id_endereco`);

-- AddForeignKey
ALTER TABLE `UserEmpresa` ADD CONSTRAINT `UserEmpresa_id_endereco_fkey` FOREIGN KEY (`id_endereco`) REFERENCES `Endereco`(`id_endereco`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCandidato` ADD CONSTRAINT `UserCandidato_id_endereco_fkey` FOREIGN KEY (`id_endereco`) REFERENCES `Endereco`(`id_endereco`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCandidato` ADD CONSTRAINT `UserCandidato_id_curriculoForm_fkey` FOREIGN KEY (`id_curriculoForm`) REFERENCES `Curriculo_form`(`id_curriculoForm`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CandidatoVaga` ADD CONSTRAINT `CandidatoVaga_id_userCandidato_fkey` FOREIGN KEY (`id_userCandidato`) REFERENCES `UserCandidato`(`id_userCandidato`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CandidatoVaga` ADD CONSTRAINT `CandidatoVaga_id_vaga_fkey` FOREIGN KEY (`id_vaga`) REFERENCES `Vaga`(`id_vaga`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CriarVaga` ADD CONSTRAINT `CriarVaga_id_userEmpresa_fkey` FOREIGN KEY (`id_userEmpresa`) REFERENCES `UserEmpresa`(`id_userEmpresa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CriarVaga` ADD CONSTRAINT `CriarVaga_id_vaga_fkey` FOREIGN KEY (`id_vaga`) REFERENCES `Vaga`(`id_vaga`) ON DELETE RESTRICT ON UPDATE CASCADE;
