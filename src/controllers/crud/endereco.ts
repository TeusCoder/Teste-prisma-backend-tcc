
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { EnderecoSchema } from "../../dto/validacoes/EnderecoValidacao";
import { z } from "zod";

const Endereco = new PrismaClient()

async function createEndereco(req: Request, res: Response) {
    try {
        const {
            pais,
            estado,
            cidade,
            bairro,
            logradouro,
            complemento,
            numero,
            cep
        } = req.body;
        //validacao pelo zod
        EnderecoSchema.parse({ pais, estado, cidade, bairro, logradouro, complemento, numero, cep })

        const createdEndereco = await Endereco.endereco.create({
            data: {
                pais,
                estado,
                cidade,
                bairro,
                logradouro,
                complemento,
                numero,
                cep
            }
        })
        return res.status(201).json(createdEndereco)
    } catch (error) {
        console.log(error)
    }
}

async function UpdateEndereco(req: Request, res: Response) {
    try {
        //pegar o id pelo params
        const { id_endereco } = req.params;

        const updateData = req.body;

        const schema = z.object({
            pais: z.string().min(1),
            estado: z.string().min(1),
            cidade: z.string().min(1),
            bairro: z.string().min(1),
            logradouro: z.string().min(1),
            complemento: z.string().min(1),
            numero: z.string().min(1),
            cep: z.string().length(8)
        }).partial();

        const parsedData = schema.safeParse(updateData);
        if (!parsedData.success) {
            return res.status(400).json({ error: parsedData.error.errors });
        }

        const EnderecoUpdated = await Endereco.endereco.update({
            where: { id_endereco },
            data: parsedData.data
        });
        res.status(200).json(EnderecoUpdated);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao atualizar o endereço' });
    }
}

async function findAllEnderecos(req: Request, res: Response) {
    try {
        const Enderecos = await Endereco.endereco.findMany();
        res.status(200).json(Enderecos);

    } catch (error) {
        console.log(error);
    }
}

async function findOneEndereco(req: Request, res: Response) {
    try {
        const { cep } = req.params;
        if (!cep) {
            return res.status(404).json({ message: "digite cep valido" });
        };
        const EnderecoExistente = await Endereco.endereco.findFirst({ where: { cep } })
        if (!EnderecoExistente) {
            res.status(404).json({ message: "Endereco não existe" });
        } else {
            res.status(200).json(EnderecoExistente)
        }
    } catch (error) {
        console.log(error);
    }
}

async function deleteEndereco(req: Request, res: Response) {
    try {
        const { id_endereco } = req.params;
        if (!id_endereco) {
            res.status(400).json({ message: "Verifique o id na url" });
        } else {
            await Endereco.endereco.delete({ where: { id_endereco } })
            res.status(200).json({ message: "endereço deletado" });
        }
    }
    catch (error) {
        console.log(error);
    }
}

export { createEndereco, UpdateEndereco, findAllEnderecos, findOneEndereco, deleteEndereco }