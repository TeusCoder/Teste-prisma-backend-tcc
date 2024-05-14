import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CriaVagaSchema } from "../../dto/validacoes/CriarVagaValidacao";

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
        res.status(201).json(createdCriaVaga);
    } catch (error) {
        console.log(error);
    }
}

async function updateCriaVaga(req: Request, res: Response) {
    try {
        const { id_criaVaga } = req.params;
        const { dataCriacao } = req.body;

        const CriaVagaUpdated = await CriaVaga.criarVaga.update({
            where: { id_criaVaga },
            data: { dataCriacao }
        });
        res.status(200).json(CriaVagaUpdated);
    } catch (error) {
        console.log(error);
    }
}

async function findAllCriaVaga(req: Request, res: Response) {
    try {
        const VagasCriadas = await CriaVaga.criarVaga.findMany();
        res.status(200).json(VagasCriadas);
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
            res.status(404).json({message: "Vaga não encontrada" });
        } else {
            res.status(200).json(VagaCriada);
        }
    } catch (error) {
        console.log(error);
    }
}

async function deleteVagaCriada(req: Request, res: Response) {
    try {
        const { id_criaVaga } = req.params;
        if (!id_criaVaga) {
            res.status(400).json({message: "Verifique o id na url" });
        } else {
            await CriaVaga.criarVaga.delete({
                where: { id_criaVaga }
            });
            res.status(200).json({message: "vaga deletada" });
        }
    } catch (error) {
        console.log(error);
    }
}

export { createCriaVaga, updateCriaVaga, findAllCriaVaga, findOneVagaCriada, deleteVagaCriada }