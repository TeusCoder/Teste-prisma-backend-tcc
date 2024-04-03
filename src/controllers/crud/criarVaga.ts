// id_criaVaga String @id @default(uuid())
// id_userEmpresa String @unique
// Empresa UserEmpresa @relation(fields: [id_userEmpresa], references: [id_userEmpresa])
// id_vaga String @unique
// Vaga Vaga @relation(fields: [id_vaga], references: [id_vaga])
// dataCriacao String