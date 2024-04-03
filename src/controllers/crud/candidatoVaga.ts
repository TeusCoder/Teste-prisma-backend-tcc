import { PrismaClient } from "@prisma/client";
import { error } from "console";
import { Request, Response } from "express";

const InscricaoCandVaga = new PrismaClient()

async function CreateInscricaoCandVaga(req: Request, res: Response) {
    try {
        const {
            id_userCandidato,
            id_vaga,
            dataInscricao
        } = req.body;

        const VerificaCandidato = await InscricaoCandVaga.userCandidato.findUnique({
            where: { id_userCandidato }
        })
        if (!VerificaCandidato) {
            return res.status(404).json({ error: "Candidato não encontrado" });
        }

        const VerificaVaga = await InscricaoCandVaga.vaga.findUnique({
            where: { id_vaga }
        });
        if (!VerificaVaga) {
            return res.status(404).json({ error: "Vaga não encontrada" });
        }
        const createdInscricao = await InscricaoCandVaga.candidatoVaga.create({
            data: {
                id_userCandidato,
                id_vaga,
                dataInscricao
            }
        });
        res.status(201).json(createdInscricao);
    } catch (error) {
        console.log(error)
    }
}

async function updateInscricao(req: Request, res: Response) {
    try {
        const { id_inscricao } = req.params;
        const { dataInscricao } = req.body;

        const IncricaoUpdated = await InscricaoCandVaga.candidatoVaga.update({
            where: { id_inscricao },
            data: { dataInscricao }
        });
        res.status(200).json(IncricaoUpdated);
    } catch (error) {
        console.log(error);
    }
}

async function findAllInscricoes(req: Request, res: Response) {
    try {
        const Inscricoes = await InscricaoCandVaga.candidatoVaga.findMany();
        res.status(200).json(Inscricoes);
    } catch (error) {
        console.log(error);
    }
}

async function findOneInscricao(req: Request, res: Response) {
    try {
        const { id_inscricao } = req.params;
        const InscricaoExistente = await InscricaoCandVaga.candidatoVaga.findUnique({
            where: { id_inscricao }
        })
        if (!InscricaoExistente) {
            res.status(404).send("Inscricao não encontrada");
        } else {
            res.status(200).json(InscricaoExistente);
        }
    } catch (error) {
        console.log(error);
    }
}

async function deleteInscricao(req: Request, res: Response) {
    try {
        const { id_inscricao } = req.params;
        if (!id_inscricao) {
            res.status(400).send("Verifique o id na url");
        } else {
            const InscricaoDeleted = await InscricaoCandVaga.candidatoVaga.delete({
                where: { id_inscricao }
            });
            res.status(200).end("inscricao deletada");
        }
    } catch (error) {
        console.log(error);
    }
}

export { CreateInscricaoCandVaga, updateInscricao, findAllInscricoes, findOneInscricao, deleteInscricao }