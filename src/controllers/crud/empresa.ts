import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { assert } from "console";

const Empresa = new PrismaClient()

async function CreateEmpresa(req: Request, res: Response) {

    //cria empresa
    const {
        razaoSocial,
        fantasia,
        cnpj,
        ie,
        email,
        senha } = req.body;

    //criptografa a senha, usando a biblioteca bcrypt
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuarioExistente = await Empresa.userEmpresa.findUnique({ where: { cnpj } });

    // if (!usuarioExistente) {
    //     const createdEmpresa = await Empresa.userEmpresa.create({
    //         data: {
    //             razaoSocial: razaoSocial,
    //             fantasia: fantasia,
    //             cnpj: cnpj,
    //             ie: ie,
    //             email: email,
    //             senha: senhaCriptografada
    //         }
    //     })
    //     res.status(201).json(createdEmpresa)

    // } else {
    //     res.status(400).send(`Usuario com esse cpf: ${cnpj} já existe!`)
    // }
}

async function UpdateEmpresa(req: Request, res: Response) {
    const { fantasia } = req.body;
    // const EmpresaUpdated = await Empresa.userEmpresa.update(
    //     {
    //         where: {
    //             email: 'superTintas@gmail.com'
    //         },
    //         data: { fantasia: fantasia }
    //     })
    // res.status(200).json(EmpresaUpdated)
}

async function findAllEmpresas(req: Request, res: Response) {
    const empresas = await Empresa.userEmpresa.findMany();
    res.status(200).json(empresas);
}

async function findOneEmpresa(req: Request, res: Response) {
    const { cnpj } = req.params;
    if (!cnpj) {
        return res.status(404).end("Digite um cnpj válido!");
    }
    const usuarioExistente = await Empresa.userEmpresa.findUnique({ where: { cnpj } });
    if (!usuarioExistente) {
        res.status(404).send(`Usuario com esse cpf: ${cnpj} não existe!`);
    } else {
        res.status(200).json(usuarioExistente)
    }
}

async function deleteEmpresa(req: Request, res: Response) {
    const { cnpj } = req.params;
    if (!cnpj) {
        return res.status(404).end("Digite um cnpj válido!");
    }
    const usuarioExistente = await Empresa.userEmpresa.findUnique({ where: { cnpj } });
    if (!usuarioExistente) {
        res.status(404).send(`Usuario com esse cpf: ${cnpj} não existe!`);
    } else {
        const usuarioExistente = await Empresa.userEmpresa.delete({ where: { cnpj } });
        res.status(200).end("usuario deletado");
    }
}

export { CreateEmpresa, UpdateEmpresa, findAllEmpresas, findOneEmpresa, deleteEmpresa }

