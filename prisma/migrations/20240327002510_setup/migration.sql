-- CreateTable
CREATE TABLE `UserEmpresa` (
    `id_userEmpresa` VARCHAR(191) NOT NULL,
    `enderecoId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `razaoSocial` CHAR(100) NOT NULL,
    `nome_fantasia` CHAR(100) NOT NULL,
    `cnpj` CHAR(14) NOT NULL,
    `ie` CHAR(16) NOT NULL,
    `telefone` CHAR(11) NOT NULL,
    `email` CHAR(100) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `UserEmpresa_enderecoId_key`(`enderecoId`),
    UNIQUE INDEX `UserEmpresa_cnpj_key`(`cnpj`),
    UNIQUE INDEX `UserEmpresa_ie_key`(`ie`),
    UNIQUE INDEX `UserEmpresa_email_key`(`email`),
    PRIMARY KEY (`id_userEmpresa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserCandidato` (
    `id_userCandidato` VARCHAR(191) NOT NULL,
    `enderecoId` VARCHAR(191) NOT NULL,
    `curriculoId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `nome` CHAR(100) NOT NULL,
    `sobrenome` CHAR(100) NOT NULL,
    `cpf` CHAR(11) NOT NULL,
    `dataNascimento` VARCHAR(191) NOT NULL,
    `email` CHAR(100) NOT NULL,
    `telefone` CHAR(11) NOT NULL,
    `curriculo_anexo` LONGTEXT NOT NULL,
    `senha` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `UserCandidato_enderecoId_key`(`enderecoId`),
    UNIQUE INDEX `UserCandidato_curriculoId_key`(`curriculoId`),
    UNIQUE INDEX `UserCandidato_cpf_key`(`cpf`),
    UNIQUE INDEX `UserCandidato_email_key`(`email`),
    PRIMARY KEY (`id_userCandidato`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Curriculo_form` (
    `id_curriculoForm` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `escolaridade` CHAR(100) NOT NULL,
    `experienciasAnt` LONGTEXT NOT NULL,
    `competenciasExtracurricular` LONGTEXT NOT NULL,
    `certificacoes` LONGTEXT NOT NULL,

    PRIMARY KEY (`id_curriculoForm`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CandidatoVaga` (
    `id_inscricao` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `candidatoId` VARCHAR(191) NOT NULL,
    `vagaId` VARCHAR(191) NOT NULL,
    `dataInscricao` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `CandidatoVaga_candidatoId_key`(`candidatoId`),
    UNIQUE INDEX `CandidatoVaga_vagaId_key`(`vagaId`),
    PRIMARY KEY (`id_inscricao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vaga` (
    `id_vaga` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `dataAbertura` VARCHAR(191) NOT NULL,
    `dataFechamento` VARCHAR(191) NOT NULL,
    `descricao` LONGTEXT NOT NULL,
    `requisitos` LONGTEXT NOT NULL,

    PRIMARY KEY (`id_vaga`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CriarVaga` (
    `id_criaVaga` VARCHAR(191) NOT NULL,
    `EmpresaId` VARCHAR(191) NOT NULL,
    `VagaId` VARCHAR(191) NOT NULL,
    `dataCriacao` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `CriarVaga_EmpresaId_key`(`EmpresaId`),
    UNIQUE INDEX `CriarVaga_VagaId_key`(`VagaId`),
    PRIMARY KEY (`id_criaVaga`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Endereco` (
    `id_endereco` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `pais` CHAR(100) NOT NULL,
    `estado` CHAR(2) NOT NULL,
    `cidade` CHAR(100) NOT NULL,
    `bairro` CHAR(100) NOT NULL,
    `logradouro` CHAR(100) NOT NULL,
    `numero` CHAR(10) NOT NULL,
    `cep` CHAR(10) NOT NULL,

    PRIMARY KEY (`id_endereco`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserEmpresa` ADD CONSTRAINT `UserEmpresa_enderecoId_fkey` FOREIGN KEY (`enderecoId`) REFERENCES `Endereco`(`id_endereco`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCandidato` ADD CONSTRAINT `UserCandidato_enderecoId_fkey` FOREIGN KEY (`enderecoId`) REFERENCES `Endereco`(`id_endereco`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCandidato` ADD CONSTRAINT `UserCandidato_curriculoId_fkey` FOREIGN KEY (`curriculoId`) REFERENCES `Curriculo_form`(`id_curriculoForm`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CandidatoVaga` ADD CONSTRAINT `CandidatoVaga_candidatoId_fkey` FOREIGN KEY (`candidatoId`) REFERENCES `UserCandidato`(`id_userCandidato`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CandidatoVaga` ADD CONSTRAINT `CandidatoVaga_vagaId_fkey` FOREIGN KEY (`vagaId`) REFERENCES `Vaga`(`id_vaga`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CriarVaga` ADD CONSTRAINT `CriarVaga_EmpresaId_fkey` FOREIGN KEY (`EmpresaId`) REFERENCES `UserEmpresa`(`id_userEmpresa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CriarVaga` ADD CONSTRAINT `CriarVaga_VagaId_fkey` FOREIGN KEY (`VagaId`) REFERENCES `Vaga`(`id_vaga`) ON DELETE RESTRICT ON UPDATE CASCADE;
