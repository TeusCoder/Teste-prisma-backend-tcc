import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

// id_userCandidato String @id @default(uuid())
// enderecoId String @unique  
// endereco Endereco @relation(fields: [enderecoId], references: [id_endereco])
// curriculoId String @unique 
// curriculo_form Curriculo_form @relation(fields: [curriculoId], references: [id_curriculoForm])
// createdAt DateTime @default(now())
// updatedAt DateTime @updatedAt
// nome String @db.Char(100) 
// sobrenome String @db.Char(100)
// cpf String @unique @db.Char(11)
// dataNascimento String 
// email String @unique @db.Char(100)
// telefone String @db.Char(11)
// curriculo_anexo String @db.LongText
// senha String
// candidatoVaga CandidatoVaga[]

const Candidato = new PrismaClient()

//criar candidato
async function createCandidato(req: Request, res: Response) {
    const {
        nome,
        sobrenome,
        email,
        dataNascimento,
        cpf,
        senha
    } = req.body;
    //criptografa a senha, usando a biblioteca bcrypt
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuarioExistente = await Candidato.userCandidato.findUnique({ where: { cpf } });
    // se o usuario não existe vai criar, se existe vai dar erro e mostrar o cpf
    // if (!usuarioExistente) {
    //     const createdCandidato = await Candidato.userCandidato.create({
    //         data: {
    //             nome: nome,
    //             sobrenome: sobrenome,
    //             email: email,
    //             dataNascimento: dataNascimento,
    //             cpf: cpf,
    //             senha: senhaCriptografada
    //         }
    //     })
    //     res.status(201).json(createdCandidato);
    // } else {
    //     res.status(400).send(`Usuario com esse cpf: ${cpf} já existe!`)
    // }
}
//validar a senha
async function isValid(req: Request, res: Response) {
    const {
        email,
        senha,
    } = req.body;

    const user = await Candidato.userCandidato.findUnique({ where: { email: email } })

    const isValid = await bcrypt.compare(senha, user.senha)

    if (!isValid) {
        return res.status(401).send("ERROU A SENHA")
    }

    res.status(200).send();
}

//atualizar candidato
//passar no req.body e no data os atributos a serem mudados
async function UpdateCandidato(req: Request, res: Response) {
    const { nome } = req.body;
    const CandidatoUpdated = await Candidato.userCandidato.update(
        {
            where: {
                email: 'mateusramalho@gmail.com'
            },
            data: { //arquivo a ser atualizado, tem que estar na req.body
                nome: nome,
            }
        }
    )
    res.status(200).json(CandidatoUpdated)
}

//encontrar todos os candidatos
async function findAllCandidatos(req: Request, res: Response) {
    const candidatos = await Candidato.userCandidato.findMany()
    res.status(200).json(candidatos)
}

//encontrar pelo params pedido
async function findOneCandidato(req: Request, res: Response) {
    const { cpf } = req.params;
    if (!cpf) {
        return res.status(404).end("Digite um cpf valido!");
    }
    const usuarioExistente = await Candidato.userCandidato.findUnique({ where: { cpf } });
    if (!usuarioExistente) {
        res.status(404).send(`Usuario com esse cpf: ${cpf} não existe!`);
    }
    else {
        // const candidato = await Candidato.userCandidato.findUnique({where: {cpf}});
        res.status(200).json(usuarioExistente);
    }
}
//deletar
async function deleteCandidato(req: Request, res: Response) {
    const { cpf } = req.params;
    //verificar se esta correto o cpf
    if (!cpf) {
        return res.status(200).end("Digite um cpf valido!");
    }
    const usuarioExistente = await Candidato.userCandidato.findUnique({ where: { cpf } });
    if (!usuarioExistente) {
        res.status(404).send(`Usuario com esse cpf: ${cpf} não existe!`);
    }
    else {
        const candidato = await Candidato.userCandidato.delete({ where: { cpf } })
        res.status(200).end("usuario deletado");
    }
}

export { createCandidato, isValid, UpdateCandidato, findAllCandidatos, findOneCandidato, deleteCandidato }