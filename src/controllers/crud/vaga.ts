import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const Vaga = new PrismaClient();

async function createVaga(req: Request, res: Response) {
    try {
        const {
            dataAbertura,
            dataFechamento,
            descricao,
            requisitos
        } = req.body;
        const createdVaga = await Vaga.vaga.create({
            data: {
                dataAbertura,
                dataFechamento,
                descricao,
                requisitos
            }
        });
        res.status(201).json(createdVaga);
    } catch (error) {
        console.log(error);
    }
}

async function updateVaga(req: Request, res: Response) {
    try {
        //pegar o id pelo params
        const { id_vaga } = req.params;
        //atributo a ser mudado
        const { descricao } = req.body;

        const VagaUpdated = await Vaga.vaga.update({
            where: { id_vaga },
            data: { descricao }
        });
        res.status(200).json(VagaUpdated);
    } catch (error) {
        console.log(error);
    }
}

async function findAllVagas(req: Request, res: Response) {
    try {
        const Vagas = await Vaga.vaga.findMany();
        res.status(200).json(Vagas);
    } catch (error) {
        console.log(error);
    }
}

async function findOneVaga(req: Request, res: Response) {
    try {
        const { id_vaga } = req.params;
        const VagaExistente = await Vaga.vaga.findUnique({
            where: { id_vaga }
        })
        if (!VagaExistente) {
            res.status(404).send("Vaga não encontrada");
        } else {
            res.status(200).json(VagaExistente)
        }
    } catch (error) {
        console.log(error);
    }
}

async function deleteVaga(req: Request, res: Response) {
    try {
        const {id_vaga} = req.params;
        if(!id_vaga) {
            res.status(400).send("Verifique o id na url");
        } else {
        const vagaDeletada = await Vaga.vaga.delete({ where: { id_vaga } })
        res.status(200).end("Vaga deletado");
        }
    } catch (error) {
        console.log(error);
    }
}

export {createVaga, updateVaga, findAllVagas, findOneVaga,deleteVaga}