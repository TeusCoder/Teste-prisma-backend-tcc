

import { PrismaClient } from "@prisma/client";
import e, { Request, Response } from "express";

const Curriculo = new PrismaClient;

async function createCurriculo(req: Request, res: Response) {
    try {
        const {
            escolaridade,
            experienciasAnt,
            competenciasExtracurricular,
            certificacoes
        } = req.body;
        const createdCurriculo = await Curriculo.curriculo_form.create({
            data: {
                escolaridade,
                experienciasAnt,
                competenciasExtracurricular,
                certificacoes
            }
        });
        res.status(201).json(createdCurriculo);
    } catch (error) {
        console.log(error);
    }
}

async function updateCurriculo(req: Request, res: Response) {
    try {
        const { id_curriculoForm } = req.params;
        const { escolaridade } = req.body;

        const curriculoUpdated = await Curriculo.curriculo_form.update({
            where: { id_curriculoForm },
            data: { escolaridade }
        });
        res.status(200).json(curriculoUpdated);
    } catch (error) {
        console.log(error);
    }
}

async function findAllCurriculos(req: Request, res: Response) {
    try {
        const Curriculos = await Curriculo.curriculo_form.findMany();
        res.status(200).json(Curriculos);
    } catch (error) {
        console.log(error);
    }
}

async function findOneCurriculo(req: Request, res: Response) {
    try {
        const { id_curriculoForm } = req.params;
        const CurriculoExistente = await Curriculo.curriculo_form.findFirst({
            where: { id_curriculoForm }
        })
        if (!CurriculoExistente) {
            res.status(404).send("CV não encontrado");
        } else {
            res.status(200).json(CurriculoExistente)
        }
    } catch (error) {
        console.log(error);
    }
}

async function deleteCurriculo(req: Request, res: Response) {
    try {
        const { id_curriculoForm } = req.params;
        if (!id_curriculoForm) {
            res.status(400).send("Verifique o id na url");
        } else {
            const CvDeletado = await Curriculo.curriculo_form.delete({ where: { id_curriculoForm } })
            res.status(200).end("CV deletado");
        }
    } catch (error) {
        console.log(error);
    }
}

export { createCurriculo, updateCurriculo, findAllCurriculos, findOneCurriculo, deleteCurriculo }