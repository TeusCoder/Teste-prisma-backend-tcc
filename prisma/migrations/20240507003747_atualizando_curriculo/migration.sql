/*
  Warnings:

  - You are about to drop the column `escolaridade` on the `curriculo_form` table. All the data in the column will be lost.
  - You are about to drop the column `experienciasAnt` on the `curriculo_form` table. All the data in the column will be lost.
  - Added the required column `campoEstudo` to the `Curriculo_form` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cargo` to the `Curriculo_form` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grau` to the `Curriculo_form` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instituicao` to the `Curriculo_form` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomeEmpresa` to the `Curriculo_form` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodo` to the `Curriculo_form` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodoEstudo` to the `Curriculo_form` table without a default value. This is not possible if the table is not empty.
  - Added the required column `realizacoes` to the `Curriculo_form` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `curriculo_form` DROP COLUMN `escolaridade`,
    DROP COLUMN `experienciasAnt`,
    ADD COLUMN `campoEstudo` CHAR(100) NOT NULL,
    ADD COLUMN `cargo` CHAR(100) NOT NULL,
    ADD COLUMN `grau` CHAR(100) NOT NULL,
    ADD COLUMN `instituicao` CHAR(100) NOT NULL,
    ADD COLUMN `nomeEmpresa` CHAR(100) NOT NULL,
    ADD COLUMN `periodo` CHAR(100) NOT NULL,
    ADD COLUMN `periodoEstudo` CHAR(100) NOT NULL,
    ADD COLUMN `realizacoes` CHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `status` INTEGER NOT NULL DEFAULT 0;
