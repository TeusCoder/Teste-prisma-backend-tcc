import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { candidatoVagaSchema } from "../../dto/validacoes/CandidadoVagaValidacao";
import { z } from "zod";

const InscricaoCandVaga = new PrismaClient()

async function CreateInscricaoCandVaga(req: Request, res: Response) {
    try {
        const {
            id_userCandidato,
            id_vaga,
            dataInscricao
        } = req.body;
        //verificação pelo zod
        candidatoVagaSchema.parse({ id_userCandidato, id_vaga, dataInscricao: new Date(dataInscricao).toISOString() });

        const VerificaCandidato = await InscricaoCandVaga.userCandidato.findUnique({
            where: { id_userCandidato }
        })
        if (!VerificaCandidato) {
            return res.status(404).json({ message: "Candidato não encontrado" });
        }

        const VerificaVaga = await InscricaoCandVaga.vaga.findUnique({
            where: { id_vaga }
        });
        if (!VerificaVaga) {
            return res.status(404).json({ messsage: "Vaga não encontrada" });
        }
        const createdInscricao = await InscricaoCandVaga.candidatoVaga.create({
            data: {
                id_userCandidato,
                id_vaga,
                dataInscricao: new Date(dataInscricao).toISOString()
            }
        });
        return res.status(201).json(createdInscricao);
    } catch (error) {
        console.log(error)
    }
}

async function updateInscricao(req: Request, res: Response) {
    try {
        const { id_inscricao } = req.params;
        const updateData = req.body;

        const schema = z.object({
            id_userCandidato: z.string().uuid(),
            id_vaga: z.string().uuid(),
            dataInscrica: z.string()
        }).partial()

        const parsedData = schema.safeParse(updateData);
        if (!parsedData.success) {
            return res.status(400).json({ error: parsedData.error.errors });
        }

        const IncricaoUpdated = await InscricaoCandVaga.candidatoVaga.update({
            where: { id_inscricao },
            data: parsedData.data,
        });
        return res.status(200).json(IncricaoUpdated);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Erro ao atualizar a Vaga Candidato' });
    }
}

async function findAllInscricoes(req: Request, res: Response) {
    try {
        const Inscricoes = await InscricaoCandVaga.candidatoVaga.findMany();
        return res.status(200).json(Inscricoes);
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
            return res.status(404).json({ message: "Inscricao não encontrada" });
        } else {
            return res.status(200).json(InscricaoExistente);
        }
    } catch (error) {
        console.log(error);
    }
}

async function deleteInscricao(req: Request, res: Response) {
    try {
        const { id_inscricao } = req.params;
        if (!id_inscricao) {
            return res.status(409).json({ message: "Verifique o id na url" });
        } else {
            await InscricaoCandVaga.candidatoVaga.delete({
                where: { id_inscricao }
            });
            return res.status(200).json({ message: "inscricao deletada" });
        }
    } catch (error) {
        console.log(error);
    }
}

export { CreateInscricaoCandVaga, updateInscricao, findAllInscricoes, findOneInscricao, deleteInscricao }