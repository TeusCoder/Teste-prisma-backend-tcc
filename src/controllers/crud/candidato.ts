import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { candidatoSchema } from "../../dto/validacoes/CandidatoValidacao";


const Candidato = new PrismaClient()
//criar candidato
async function createCandidato(req: Request, res: Response) {
    try {
        const {
            id_endereco,
            id_curriculoForm,
            nome,
            sobrenome,
            cpf,
            dataNascimento,
            email,
            telefone,
            curriculo_anexo,
            senha
        } = req.body;
        //verificação pelo zod
        candidatoSchema.parse({id_endereco, id_curriculoForm, nome, sobrenome,cpf,dataNascimento: new Date(dataNascimento),email,telefone,curriculo_anexo,senha});
        //criptografa a senha, usando a biblioteca bcrypt
        const senhaCriptografada = await bcrypt.hash(senha, 10);
        //verificar endereco e curriculo
        const VerificaEndereco = await Candidato.endereco.findUnique({
            where: { id_endereco }
        });
        if (!VerificaEndereco) {
            return res.status(404).json({ error: 'Endereço não encontrado.' });
        };
        //verificar curriculo
        const VerificaCV = await Candidato.curriculo_form.findUnique({
            where: { id_curriculoForm }
        });
        if (!VerificaCV) {
            return res.status(404).json({ error: 'CV não encontrado.' });
        }

        const usuarioExistente = await Candidato.userCandidato.findUnique({ where: { cpf } });
        // se o usuario não existe vai criar, se existe vai dar erro e mostrar o cpf
        if (!usuarioExistente) {
            const createdCandidato = await Candidato.userCandidato.create({
                data: {
                    id_endereco,
                    id_curriculoForm,
                    nome,
                    sobrenome,
                    cpf,
                    dataNascimento, //toString().split('T')[0],
                    email,
                    telefone,
                    curriculo_anexo,
                    senha: senhaCriptografada
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
//validar a senha
// async function isValid(req: Request, res: Response) {
//     try {
//         const {
//             email,
//             senha,
//         } = req.body;

//         const user = await Candidato.userCandidato.findUnique({ where: { email: email } })

//         const isValid = await bcrypt.compare(senha, user.senha)

//         if (!isValid) {
//             return res.status(401).send("ERROU A SENHA")
//         }

//         res.status(200).send();
//     } catch (error) {
//         console.log(error)
//     }
// }

//atualizar candidato
//passar no req.body e no data os atributos a serem mudados
async function UpdateCandidato(req: Request, res: Response) {
    try {
        const { email } = req.params;
        const { nome } = req.body;
        const CandidatoUpdated = await Candidato.userCandidato.update({
            where: { email },
            data: { nome }
        });
        res.status(200).json(CandidatoUpdated);
    }
    catch (error) {
        console.log(error);
    }
}
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
        const { cpf } = req.params;
        if (!cpf) {
            return res.status(404).end("Digite um cpf valido!");
        }
        const usuarioExistente = await Candidato.userCandidato.findUnique({ where: { cpf } });
        if (!usuarioExistente) {
            res.status(404).send(`Usuario com esse cpf: ${cpf} não existe!`);
        }
        else {
            res.status(200).json(usuarioExistente);
        }
    } catch (error) {
        console.log(error);
    }
}
//deletar
async function deleteCandidato(req: Request, res: Response) {
    try {
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
            const candidatoDeletado = await Candidato.userCandidato.delete({ where: { cpf } })
            res.status(200).end("usuario deletado");
        }
    } catch (error) {
        console.log(error)
    }
}

export { createCandidato, UpdateCandidato, findAllCandidatos, findOneCandidato, deleteCandidato }