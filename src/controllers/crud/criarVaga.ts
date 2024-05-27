import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CriaVagaSchema } from "../../dto/validacoes/CriarVagaValidacao";
import { z } from "zod";

const CriaVaga = new PrismaClient();

async function createCriaVaga(req: Request, res: Response) {
    try {
        const {
            id_userEmpresa,
            id_vaga,
            dataCriacao
        } = req.body;

        //validação pelo zod
        CriaVagaSchema.parse({ id_userEmpresa, id_vaga, dataCriacao: new Date(dataCriacao).toISOString() });

        const createdCriaVaga = await CriaVaga.criarVaga.create({
            data: {
                id_userEmpresa,
                id_vaga,
                dataCriacao: new Date(dataCriacao).toISOString()
            }
        });
        return res.status(201).json(createdCriaVaga);
    } catch (error) {
        console.log(error);
    }
}

async function updateCriaVaga(req: Request, res: Response) {
    try {
        const { id_criaVaga } = req.params;
        const updateData = req.body;

        const schema = z.object({
            id_userEmpresa: z.string().uuid(),
            id_vaga: z.string().uuid(),
            dataCriacao: z.string()
        }).partial();

        const parsedData = schema.safeParse(updateData);
        if (!parsedData.success) {
            return res.status(400).json({ error: parsedData.error.errors });
        }

        const CriaVagaUpdated = await CriaVaga.criarVaga.update({
            where: { id_criaVaga },
            data: parsedData.data,
        });
        return res.status(200).json(CriaVagaUpdated);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Erro ao atualizar a vaga' });
    }
}

async function findAllCriaVaga(req: Request, res: Response) {
    try {
        const VagasCriadas = await CriaVaga.criarVaga.findMany();
        return res.status(200).json(VagasCriadas);
    } catch (error) {
        console.log(error);
    }
}

async function findOneVagaCriada(req: Request, res: Response) {
    try {
        const { id_criaVaga } = req.params;
        const VagaCriada = await CriaVaga.criarVaga.findUnique({
            where: { id_criaVaga }
        })
        if (!VagaCriada) {
            return res.status(404).json({ message: "Vaga não encontrada" });
        } else {
            return res.status(200).json(VagaCriada);
        }
    } catch (error) {
        console.log(error);
    }
}

async function deleteVagaCriada(req: Request, res: Response) {
    try {
        const { id_criaVaga } = req.params;
        if (!id_criaVaga) {
            return res.status(409).json({ message: "Verifique o id na url" });
        } else {
            await CriaVaga.criarVaga.delete({
                where: { id_criaVaga }
            });
            return res.status(200).json({ message: "vaga deletada" });
        }
    } catch (error) {
        console.log(error);
    }
}

export { createCriaVaga, updateCriaVaga, findAllCriaVaga, findOneVagaCriada, deleteVagaCriada }