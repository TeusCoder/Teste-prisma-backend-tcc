import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { EmpresaSchema } from "../../dto/validacoes/EmpresaValidacao";

const Empresa = new PrismaClient()

async function CreateEmpresa(req: Request, res: Response) {
    try {
        //cria empresa
        const {
            id_endereco,
            razaoSocial,
            nome_fantasia,
            cnpj,
            ie,
            telefone,
            email,
            senha
        } = req.body;
        //verificação pelo zod
        EmpresaSchema.parse({ id_endereco, razaoSocial, nome_fantasia, cnpj, ie, telefone, email, senha });

        //criptografa a senha, usando a biblioteca bcrypt
        const senhaCriptografada = await bcrypt.hash(senha, 10);
        //verificar endereço
        const VerificaEndereco = await Empresa.endereco.findUnique({
            where: { id_endereco }
        });
        if (!VerificaEndereco) {
            return res.status(404).json({ error: 'Endereço não encontrado.' });
        };

        const usuarioExistente = await Empresa.userEmpresa.findUnique({ where: { cnpj } });

        if (!usuarioExistente) {
            const createdEmpresa = await Empresa.userEmpresa.create({
                data: {
                    id_endereco,
                    razaoSocial,
                    nome_fantasia,
                    cnpj,
                    ie,
                    telefone,
                    email,
                    senha: senhaCriptografada
                }
            })
            res.status(201).json(createdEmpresa);
        } else {
            res.status(400).send(`Usuario com esse cpf: ${cnpj} já existe!`);
        }
    } catch (error) {
        console.log(error);
    }
}
//atualizar empresa
//passar no req.body e no data os atributos a serem mudados
async function UpdateEmpresa(req: Request, res: Response) {
    try {
        const { id_userEmpresa } = req.params;
        const { nome_fantasia } = req.body;
        const EmpresaUpdated = await Empresa.userEmpresa.update({
            where: { id_userEmpresa },
            data: { nome_fantasia }
        });
        res.status(200).json(EmpresaUpdated);
    } catch (error) {
        console.log(error);
    }
}

async function findAllEmpresas(req: Request, res: Response) {
    try {
        const empresas = await Empresa.userEmpresa.findMany();
        res.status(200).json(empresas);
    } catch (error) {
        console.log(error);
    }
}

async function findOneEmpresa(req: Request, res: Response) {
    try {
        const { id_userEmpresa } = req.params;
        if (!id_userEmpresa) {
            return res.status(404).end("Digite um id válido!");
        }
        const usuarioExistente = await Empresa.userEmpresa.findUnique({ where: { id_userEmpresa } });
        if (!usuarioExistente) {
            res.status(404).send(`Empresa com esse id: ${id_userEmpresa} não existe!`);
        } else {
            res.status(200).json(usuarioExistente)
        }
    } catch (error) {
        console.log(error);
    }
}

async function deleteEmpresa(req: Request, res: Response) {
    try {
        const { id_userEmpresa } = req.params;
        if (!id_userEmpresa) {
            return res.status(404).end("Digite um id válido!");
        }
        const usuarioExistente = await Empresa.userEmpresa.findUnique({ where: { id_userEmpresa } });
        if (!usuarioExistente) {
            res.status(404).send(`Empresa com esse id: ${id_userEmpresa} não existe!`);
        } else {
            await Empresa.userEmpresa.delete({ where: { id_userEmpresa } });
            res.status(200).end("usuario deletado");
        }
    } catch (error) {
        console.log(error);
    }
}

export { CreateEmpresa, UpdateEmpresa, findAllEmpresas, findOneEmpresa, deleteEmpresa }

