import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { candidatoSchema } from "../../dto/validacoes/CandidatoValidacao";


const Candidato = new PrismaClient()
//criar candidato
async function createCandidato(req: Request, res: Response) {
    try {
        const {
            id_user,
            id_endereco,
            nome,
            sobrenome,
            cpf,
            dataNascimento,
            telefone,
        } = req.body;
        //verificação pelo zod
        candidatoSchema.parse({ id_user, id_endereco, nome, sobrenome, cpf, dataNascimento:new Date(dataNascimento).toISOString(), telefone });
        //verificar endereco e /user
        const VerificaEndereco = await Candidato.endereco.findUnique({
            where: { id_endereco }
        });
        if (!VerificaEndereco) {
            return res.status(404).json({ error: 'Endereço não encontrado.' });
        };

        const VerificaUser = await Candidato.user.findUnique({where: {id_user}});
        if(!VerificaUser) {return res.status(404).end("User não encontrado")};

        const usuarioExistente = await Candidato.userCandidato.findUnique({ where: { cpf } });
        // se o usuario não existe vai criar, se existe vai dar erro e mostrar o cpf
        if (!usuarioExistente) {
            const createdCandidato = await Candidato.userCandidato.create({
                data: {
                    id_user,
                    id_endereco,
                    nome,
                    sobrenome,
                    cpf,
                    dataNascimento:new Date(dataNascimento).toISOString() ,
                    telefone,
                }
            })
            res.status(201).json(createdCandidato);
        } else {
            res.status(400).send(`Usuario com esse cpf: ${cpf} já existe!`);
        }
    }
    catch (error) {
        console.log(error);
    }
}

//atualizar candidato
//passar no req.body e no data os atributos a serem mudados
// async function UpdateCandidato(req: Request, res: Response) {
//     try {
//         const { id_userCandidato } = req.params;
//         const Candidato.userCandidato = req.body;

//         const UpdatedCandidato = await Candidato.userCandidato.findUnique
//         const CandidatoUpdated = await Candidato.userCandidato.update({
//             where: { id_userCandidato },
//             data: { candidatoFront }
//         });
//         res.status(200).json(CandidatoUpdated);
//     }
//     catch (error) {
//         console.log(error);
//     }
// }

//encontrar todos os candidatos
async function findAllCandidatos(req: Request, res: Response) {
    try {
        const candidatos = await Candidato.userCandidato.findMany();
        res.status(200).json(candidatos);
    } catch (error) {
        console.log(error);
    }
}
//encontrar pelo params pedido
async function findOneCandidato(req: Request, res: Response) {
    try {
        const { id_userCandidato } = req.params;
        if (!id_userCandidato) {
            return res.status(404).end("Digite um id valido!");
        }
        const usuarioExistente = await Candidato.userCandidato.findUnique({ where: { id_userCandidato } });
        if (!usuarioExistente) {
            res.status(404).send(`Usuario com esse id: ${id_userCandidato} não existe!`);
        }
        else {
            res.status(200).json(usuarioExistente);
        }
    } catch (error) {
        console.log(error);
    }
}


export { createCandidato, findAllCandidatos, findOneCandidato }