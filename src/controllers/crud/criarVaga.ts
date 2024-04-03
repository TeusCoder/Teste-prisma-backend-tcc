// id_criaVaga String @id @default(uuid())
// id_userEmpresa String @unique
// Empresa UserEmpresa @relation(fields: [id_userEmpresa], references: [id_userEmpresa])
// id_vaga String @unique
// Vaga Vaga @relation(fields: [id_vaga], references: [id_vaga])
// dataCriacao String
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const CriaVaga = new PrismaClient();

async function createCriaVaga(req: Request, res: Response) {
    try {
        const {
            id_userEmpresa,
            id_vaga,
            dataCriacao
        } = req.body;
        const createdCriaVaga = await CriaVaga.criarVaga.create({
            data: {
                id_userEmpresa,
                id_vaga,
                dataCriacao
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
            res.status(404).send("Vaga não encontrada");
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
            res.status(400).send("Verifique o id na url");
        } else {
            const VagaCriadaDeleted = await CriaVaga.criarVaga.delete({
                where: { id_criaVaga }
            });
            res.status(200).end("vaga deletada");
        }
    } catch (error) {
        console.log(error);
    }
}

export {createCriaVaga, updateCriaVaga, findAllCriaVaga, findOneVagaCriada,deleteVagaCriada}